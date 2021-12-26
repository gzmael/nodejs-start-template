import { User } from '@prisma/client';
import prisma from '@shared/infra/prisma';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  async create({
    email,
    name,
    password,
    type = 'PATIENT',
  }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        type,
        status: 'INACTIVE',
      },
    });

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByCellPhone(cellphone: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        cellphone,
      },
    });

    return user;
  }

  async findBySocialNumber(social_number: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        socialNumber: social_number,
      },
    });

    return user;
  }

  async findById(id: bigint): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async save(user: User): Promise<User> {
    const userUpdated = await prisma.user.update({
      data: {
        ...user,
      },
      where: {
        id: user.id,
      },
    });

    return userUpdated;
  }

  async delete(user: User): Promise<void> {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}

export { UsersRepository };
