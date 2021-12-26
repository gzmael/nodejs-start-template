import { UserToken, TypeUserToken, User } from '@prisma/client';
import prisma from '@shared/infra/prisma';
import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import {
  IFindByUserAndToken,
  IUserTokensRepository,
} from '@modules/users/repositories/IUserTokensRepository';

type UserTokenUser = UserToken & { user: User };
class UserTokensRepository implements IUserTokensRepository {
  async create({
    expires_date,
    token,
    type,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = await prisma.userToken.create({
      data: {
        expiresDate: expires_date,
        token,
        type,
        userId: user_id,
      },
    });

    return userToken;
  }

  async findByUserToken({
    token,
    type,
    userId,
  }: IFindByUserAndToken): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        userId,
        token,
        type,
      },
    });

    return userToken;
  }

  async findByToken(
    token: string,
    type: TypeUserToken,
  ): Promise<UserTokenUser | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        token,
        type,
      },
      include: {
        user: true,
      },
    });

    return userToken;
  }

  async delete(id: bigint): Promise<void> {
    await prisma.userToken.delete({
      where: {
        id,
      },
    });
  }

  async deleteRefreshTokensByUserId(userId: bigint): Promise<void> {
    await prisma.userToken.deleteMany({
      where: {
        userId,
        type: 'REFRESH',
      },
    });
  }

  async deletePasswordTokensByUserId(userId: bigint): Promise<void> {
    await prisma.userToken.deleteMany({
      where: {
        userId,
        type: 'PASSWORD',
      },
    });
  }

  async save(userToken: UserToken): Promise<UserToken> {
    const userTokenUpdated = await prisma.userToken.update({
      where: {
        id: userToken.id,
      },
      data: {
        ...userToken,
      },
    });

    return userTokenUpdated;
  }
}

export { UserTokensRepository };
