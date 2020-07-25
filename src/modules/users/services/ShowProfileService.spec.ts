import AppError from '@shared/errors/AppErros';
import { uuid } from 'uuidv4';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

describe('ShowProfile', () => {
    let fakeUserRepository: FakeUsersRepository;
    let showProfile: ShowProfileService;

    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUserRepository);
    });
    it('should be able show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const showUser = await showProfile.execute({
            user_id: user.id,
        });

        expect(showUser?.name).toBe('John Doe');
        expect(showUser?.email).toBe('johndoe@example.com');
    });

    it('should not be able show the profile from non-existing user', async () => {
        await expect(
            showProfile.execute({
                user_id: uuid(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
