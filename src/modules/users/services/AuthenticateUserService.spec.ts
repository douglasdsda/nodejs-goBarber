import AppError from '@shared/errors/AppErros';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
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

        const user = await createUser.execute({
            name: 'Joe Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        // expect(response.user).toEqual(user);
    });

    it('should be able to authenticate with non existing user', async () => {
        const fakeUserRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        expect(
            authenticateUser.execute({
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    describe('AuthenticateUser', () => {
        it('should not be able to authenticate with wrong passard', async () => {
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

            await createUser.execute({
                name: 'Joe Doe',
                email: 'johndoe@example.com',
                password: '123456',
            });

            expect(
                authenticateUser.execute({
                    email: 'johndoe@example.com',
                    password: 'wrong-password',
                }),
            ).rejects.toBeInstanceOf(AppError);
        });
    });
});
