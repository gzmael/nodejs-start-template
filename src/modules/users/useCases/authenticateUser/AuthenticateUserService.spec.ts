/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import { User } from '@prisma/client';
import { randomUUID as uuid } from 'crypto';
import { mockReset } from 'jest-mock-extended';
import { DayJSProvider } from '@shared/container/providers/DateProvider/implementations/DayJSProvider';
import { BCryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import { JwtTokenProvider } from '@shared/container/providers/TokenProvider/implementations/JwtTokenProvider';
import { InativeUserError } from '@modules/users/errors/InativeUserError';
import { InvalidEmailPasswordError } from '@modules/users/errors/InvalidEmailPasswordError';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/prisma/repositories/UserTokensRepository';
import { prismaMock } from '../../../../singleton';
import { AuthenticateUserService } from './AuthenticateUserService';

let authenticateUserService: AuthenticateUserService;
let usersRepository: UsersRepository;
let userTokensRepository: UserTokensRepository;
let hashProvider: BCryptHashProvider;
let tokenProvider: JwtTokenProvider;
let dateProvider: DayJSProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    userTokensRepository = new UserTokensRepository();
    hashProvider = new BCryptHashProvider();
    tokenProvider = new JwtTokenProvider();
    dateProvider = new DayJSProvider();

    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      userTokensRepository,
      hashProvider,
      tokenProvider,
      dateProvider,
    );

    mockReset(prismaMock);
  });

  it('Should able to authenticate a user', async () => {
    const user: User = {
      id: BigInt(1),
      publicId: uuid(),
      avatar: 'avatar.png',
      email: 'teste@mail.com',
      password: await hashProvider.generateHash('asdqwe123'),
      name: 'Teste',
      cellphone: '11999999999',
      lastName: 'Teste',
      status: 'ACTIVE',
      type: 'PATIENT',
      socialNumber: '123456789',
      addressId: BigInt(1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: 'asdqwe123',
    });
    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an user with invalid user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(
      authenticateUserService.execute({
        email: 'invalid@email.com',
        password: 'invalidPassword',
      }),
    ).rejects.toBeInstanceOf(InvalidEmailPasswordError);
  });

  it('Should not be able to authenticate an user with invalid password', async () => {
    const user: User = {
      id: BigInt(1),
      publicId: uuid(),
      avatar: 'avatar.png',
      email: 'teste@mail.com',
      password: await hashProvider.generateHash('asdqwe123'),
      name: 'Teste',
      cellphone: '11999999999',
      lastName: 'Teste',
      status: 'ACTIVE',
      type: 'PATIENT',
      socialNumber: '123456789',
      addressId: BigInt(1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(user);

    await expect(
      authenticateUserService.execute({
        email: 'teste@mail.com',
        password: 'invalidPassword',
      }),
    ).rejects.toBeInstanceOf(InvalidEmailPasswordError);
  });

  it('Should not be able to authenticate an inactive user', async () => {
    const user: User = {
      id: BigInt(1),
      publicId: uuid(),
      avatar: 'avatar.png',
      email: 'teste@mail.com',
      password: await hashProvider.generateHash('asdqwe123'),
      name: 'Teste',
      cellphone: '11999999999',
      lastName: 'Teste',
      status: 'INACTIVE',
      type: 'PATIENT',
      socialNumber: '123456789',
      addressId: BigInt(1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(user);

    await expect(
      authenticateUserService.execute({
        email: 'teste@mail.com',
        password: 'asdqwe123',
      }),
    ).rejects.toBeInstanceOf(InativeUserError);
  });
});
