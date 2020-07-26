import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

describe('ListProviders', () => {
    let fakeUserRepository: FakeUsersRepository;
    let ListProviders: ListProvidersService;

    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        ListProviders = new ListProvidersService(fakeUserRepository);
    });
    it('should be able show the profile', async () => {
        const user1 = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUserRepository.create({
            name: 'John Doe2',
            email: 'johndoe2@example.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'John Doe3',
            email: 'johndoe3@example.com',
            password: '123456',
        });

        const listProviers = await ListProviders.execute({
            user_id: user.id,
        });

        expect(listProviers).toEqual([user1, user2]);
    });
});
