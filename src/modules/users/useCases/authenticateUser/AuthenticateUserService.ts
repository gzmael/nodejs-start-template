import 'reflect-metadata';
import { Role } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IHashProvider } from '@shared/container/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';
import { InativeUserError } from '@modules/users/errors/InativeUserError';
import { InvalidEmailPasswordError } from '@modules/users/errors/InvalidEmailPasswordError';
import { UserMapper } from '@modules/users/mappers/UserMapper';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';

interface ICredentials {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    type: Role;
    avatar_url: string | null;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: ICredentials): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidEmailPasswordError();
    }

    if (user.status === 'INACTIVE') {
      throw new InativeUserError();
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new InvalidEmailPasswordError();
    }

    const token = this.tokenProvider.generateToken(user.publicId);

    const refresh_token = this.tokenProvider.generateRefreshToken(
      user.publicId,
      user.email,
    );

    const dateNow = this.dateProvider.dateNow();
    const expiresRefreshTokenDays =
      this.tokenProvider.expiresRefreshTokenDays();

    const refreshTokenExpiresDate = this.dateProvider.addDay(
      dateNow,
      expiresRefreshTokenDays,
    );

    await this.userTokensRepository.deleteRefreshTokensByUserId(user.id);

    await this.userTokensRepository.create({
      expires_date: refreshTokenExpiresDate,
      token: refresh_token,
      type: 'REFRESH',
      user_id: user.id,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
        type: user.type,
        avatar_url: UserMapper.getAvatarUrl(user),
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserService };
