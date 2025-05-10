import { PrismaClient } from '../../../generated/prisma';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async save(user: UserEntity): Promise<void> {
    const userMapper = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      gender: user.gender,
      image: user.image,
      password: user.password,
    };
    await this.prismaClient.user.upsert({
      where: { id: user.id },
      update: {
        ...userMapper,
      },
      create: {
        id: user.id,
        ...userMapper,
      },
    });
  }
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaClient.user.findMany();
    return users.map((u) =>
      UserEntity.fromObject({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        age: u.age,
        gender: u.gender,
        image: u.image,
        password: u.password,
      })
    );
  }
}
