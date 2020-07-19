import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUsersService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = createUser.execute({
            name: 'Joe Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
});
