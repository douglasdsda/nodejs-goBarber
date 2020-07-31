import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

describe('ListProviders', () => {
    let fakeUserRepository: FakeUsersRepository;
    let ListProviders: ListProvidersService;
    let fakeCacheProvider: FakeCacheProvider;

    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        ListProviders = new ListProvidersService(
            fakeUserRepository,
            fakeCacheProvider,
        );
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
