import axios from 'axios';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { mock } from 'jest-mock-extended';
import { LoadUsersUseCase } from './load-users.usecase';

// * Creamos el mock de las dependencias
jest.mock('axios');
jest.mock('bcrypt');

// * Indicamos a typeScript que las dependencias han sido mockeadas y le indicamos el tipado
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('load-users.usecase', () => {
  const userRepositoryMock = mock<UserRepository>();
  const useCase = new LoadUsersUseCase(userRepositoryMock);

  test('should fetch users, hash password and save them', async () => {
    // * Simulamos la respuesta de la API
    // * en este ejemplo indicamos que nos devuelva un array con usuarios
    // * envuelto en el tipico wrapper "data" de axios
    mockedAxios.get.mockResolvedValue({
      data: {
        users: [
          {
            id: 1,
            firstName: 'Daniel',
            lastName: 'Lopesino',
            email: 'dlopesino@gmail.com',
            age: 38,
            gender: 'male',
            image: 'nosequien.png',
          },
        ],
      },
    });
    // * Simulamos el hash del password
    // * Esta sección del código es para que typeScript no se queje en el tipado
    // * Antes ? queja: mockedBcrypt.hash.mockResolvedValue(..)
    // * Ahora = solucionado: (mockedBcrypt.hash as jest.Mock).mockResolvedValue(...)
    (mockedBcrypt.hash as jest.Mock).mockResolvedValue('fakeHashedPassword');

    await useCase.execute();

    // * Verificamos que se guardó el usuario con password hasheado
    expect(userRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        email: 'dlopesino@gmail.com',
        password: 'fakeHashedPassword',
      })
    );
  });
});
