import { User } from '@prisma/client';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findByCellPhone(cellphone: string): Promise<User | null>;
  findBySocialNumber(social_number: string): Promise<User | null>;
  findById(id: bigint): Promise<User | null>;
  save(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}

export { IUsersRepository };
