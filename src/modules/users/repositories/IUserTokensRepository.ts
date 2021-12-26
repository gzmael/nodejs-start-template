import { UserToken, TypeUserToken, User } from '@prisma/client';
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IFindByUserAndToken {
  userId: bigint;
  token: string;
  type: TypeUserToken;
}

type UserTokenUser = UserToken & { user: User };

interface IUserTokensRepository {
  create(date: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserToken(data: IFindByUserAndToken): Promise<UserToken | null>;
  findByToken(
    token: string,
    type: TypeUserToken,
  ): Promise<UserTokenUser | null>;
  delete(id: bigint): Promise<void>;
  deleteRefreshTokensByUserId(userId: bigint): Promise<void>;
  deletePasswordTokensByUserId(userId: bigint): Promise<void>;
  save(userToken: UserToken): Promise<UserToken>;
}

export { IUserTokensRepository, IFindByUserAndToken };
