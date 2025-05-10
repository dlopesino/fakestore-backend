import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  save(user: UserEntity): Promise<void>;
  findAll(): Promise<UserEntity[]>;
}
