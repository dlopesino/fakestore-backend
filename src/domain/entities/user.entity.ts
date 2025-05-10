import { regularExps } from '../../config';
import { InvalidUserError } from '../errors';

export class UserEntity {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public age: number,
    public gender: string,
    public image: string,
    public password: string
  ) {}

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromObject(obj: UserProps): UserEntity {
    const { id, firstName, lastName, email, age, gender, image, password } =
      obj;
    if (!id) throw new InvalidUserError('Missing user id');
    if (!firstName) throw new InvalidUserError('Missing user firstName');
    if (!lastName) throw new InvalidUserError('Missing user lastName');
    if (!email) throw new InvalidUserError('Missing user email');
    if (!regularExps.email.test(email))
      throw new InvalidUserError('Invalid email');
    if (!age) throw new InvalidUserError('Missing user age');
    if (!gender) throw new InvalidUserError('Missing user gender');
    if (!image) throw new InvalidUserError('Missing user image');
    if (!password) throw new InvalidUserError('Missing user password');
    return new UserEntity(
      id,
      firstName,
      lastName,
      email,
      age,
      gender,
      image,
      password
    );
  }
}
