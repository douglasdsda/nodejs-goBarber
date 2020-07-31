import AppError from '@shared/errors/AppErros';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUsersService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
        authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        await createUser.execute({
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
        await expect(
            authenticateUser.execute({
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    describe('AuthenticateUser', () => {
        it('should not be able to authenticate with wrong passard', async () => {
            await createUser.execute({
                name: 'Joe Doe',
                email: 'johndoe@example.com',
                password: '123456',
            });

            await expect(
                authenticateUser.execute({
                    email: 'johndoe@example.com',
                    password: 'wrong-password',
                }),
            ).rejects.toBeInstanceOf(AppError);
        });
    });
});
