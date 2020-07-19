import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUsersService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUserRepository);
        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
        );

        await createUser.execute({
            name: 'Joe doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });
});
