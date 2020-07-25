import AppError from '@shared/errors/AppErros';
import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

describe('UpdateProfile', () => {
    let fakeUserRepository: FakeUsersRepository;
    let fakeHashProvider: FakeHashProvider;
    let updateProfile: UpdateProfileService;

    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });
    it('should be able update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updateUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johndoe2@example.com',
        });

        expect(updateUser?.name).toBe('John Trê');
        expect(updateUser?.email).toBe('johndoe2@example.com');
    });

    it('should be able update to change tho another user email', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@example.com',
            password: '123456',
        });

        const userUpdate = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johndoe@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(userUpdate?.password).toBe('123123');
    });

    it('should not be able update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johndoe@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able update the password with wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johndoe@example.com',
                password: '123123',
                old_password: 'wrong-old-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able update the profile from non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: uuid(),
                email: 'Teste@example.com',
                name: 'Teste',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
