import { User } from '@prisma/client';

type IUserResponseDTO = Omit<User, 'password' | 'id'> & {
  avatar_url: string | null;
  full_name: string;
};

export type { IUserResponseDTO };
