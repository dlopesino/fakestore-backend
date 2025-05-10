import { UserEntity } from './user.entity';

describe('user.entity.test', () => {
  test('should create a UserEntity instance', () => {
    const userObject = {
      id: 1,
      age: 38,
      email: 'dlopesino@gmail.com',
      firstName: 'daniel',
      gender: 'male',
      image: 'nosequien.png',
      lastName: 'lopesino',
      password: 'dasfiweured9348',
    };

    const userEntity = UserEntity.fromObject(userObject);

    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.id).toBe(userObject.id);
    expect(userEntity.email).toBe(userObject.email);
    expect(userEntity.firstName).toBe(userObject.firstName);
    expect(userEntity.lastName).toBe(userObject.lastName);
    expect(userEntity.getFullName()).toBe('daniel lopesino');
  });
});
