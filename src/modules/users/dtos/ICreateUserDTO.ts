import { Role } from '@prisma/client';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  type?: Role;
}

export { ICreateUserDTO };
