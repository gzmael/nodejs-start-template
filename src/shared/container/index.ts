import { container } from 'tsyringe';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/prisma/repositories/UserTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
