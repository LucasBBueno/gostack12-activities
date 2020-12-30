import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'joindoe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const userEmail = 'johndoe@email.com';

    await createUserService.execute({
      name: 'John Doe',
      email: userEmail,
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: userEmail,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
