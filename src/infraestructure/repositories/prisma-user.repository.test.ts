import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '../../../generated/prisma';
import { PrismaUserRepository } from './prisma-user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

describe('prisma-user.test', () => {
  // * 1) Creamos un mock profundo de PrismaClient
  // * Es un prisma flase, que nos proporcionará los métodos simulados
  const prismaMock = mockDeep<PrismaClient>();

  // * 2) Inyectamos el mock en el repositorio
  const repository = new PrismaUserRepository(prismaMock);

  // * 3) Creamos un usuario de prueba
  // * montamos una instancia UserEntity con datos simulados
  const user = UserEntity.fromObject({
    age: 23,
    email: 'emailfake@test.com',
    firstName: 'test',
    lastName: 'test',
    gender: 'male',
    id: 2,
    image: 'noseque.png',
    password: '123456789',
  });

  // * 4) test del método save
  test('should save user using upsert', async () => {
    await repository.save(user);

    // * Verificamos que -upsert() se llamó con where.id correcto + update / create
    expect(prismaMock.user.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: user.id },
        update: expect.any(Object),
        create: expect.any(Object),
      })
    );
  });

  // * 5) test del metodo findAll
  test('should return all users', async () => {
    // * 5-1) Para testear un findAll con prisma lo primero que hacemos es
    // * indicar a prisma(mocked) con mockResolvedValue el valor a devolver, en este caso un array de elementos

    // * simulamos .findMany() devolviendo un usuario, verificamos que lo mapea a entidad
    prismaMock.user.findMany.mockResolvedValue([
      {
        id: 1,
        firstName: 'Daniel',
        lastName: 'Lopesino',
        email: 'dlopesino@gmail.com',
        age: 38,
        gender: 'male',
        image: 'nosequien.png',
        password: 'hashedpassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    // * 5-2) A continuación, hacemos la llamada al repositorio para evaluar los valores del resultado
    const result = await repository.findAll();

    expect(result[0]).toBeInstanceOf(UserEntity);
    expect(result[0].id).toBe(1);
    expect(result[0].email).toBe('dlopesino@gmail.com');
    expect(result[0].firstName).toBe('Daniel');
  });
});
