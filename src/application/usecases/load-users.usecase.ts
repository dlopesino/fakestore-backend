import axios from 'axios';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

export class LoadUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<void> {
    const response = await axios.get('https://dummyjson.com/users?limit=100');
    const { users } = response.data;

    // Hasheamos el password inicial solo una vez
    const hashedPassword = await bcrypt.hash('123456789', 10);

    for (const u of users) {
      const user = UserEntity.fromObject(u);
      await this.userRepository.save(user);
    }
  }
}
