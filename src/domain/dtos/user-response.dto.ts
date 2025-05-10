import { regularExps } from '../../config';

export class UserResponseDTO {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly age: number,
    public readonly gender: string,
    public readonly image: string,
    public readonly password: string,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}

  static create(obj: Partial<UserInput>): Result<UserResponseDTO> {
    const {
      id,
      firstName,
      lastName,
      email,
      age,
      gender,
      image,
      password,
      createdAt,
      updatedAt,
    } = obj;

    if (!id) return { ok: false, error: 'Missing user Id' };
    if (!firstName) return { ok: false, error: 'Missing user firstName' };
    if (!lastName) return { ok: false, error: 'Missing user lastName' };
    if (!email) return { ok: false, error: 'Missing user email' };
    if (!regularExps.email.test(email))
      return { ok: false, error: 'Invalid email' };
    if (!age) return { ok: false, error: 'Missing user age' };
    if (!gender) return { ok: false, error: 'Missing user gender' };
    if (!image) return { ok: false, error: 'Missing user image' };
    if (!password) return { ok: false, error: 'Missing user password' };
    if (!createdAt) return { ok: false, error: 'Missing user createdAt' };
    if (!updatedAt) return { ok: false, error: 'Missing user updatedAt' };

    return {
      ok: true,
      value: new UserResponseDTO(
        id,
        firstName,
        lastName,
        email,
        age,
        gender,
        image,
        password,
        createdAt,
        updatedAt
      ),
    };
  }
}
