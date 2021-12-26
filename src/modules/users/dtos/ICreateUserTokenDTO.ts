import { TypeUserToken } from '@prisma/client';

interface ICreateUserTokenDTO {
  user_id: bigint;
  expires_date: Date;
  token: string;
  type: TypeUserToken;
}

export { ICreateUserTokenDTO };
