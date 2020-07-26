import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaliabilityService: ListProviderMonthAvaliabilityService;

describe('ListProviderMonthAvaliability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvaliabilityService = new ListProviderMonthAvaliabilityService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 9, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 11, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 12, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 13, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 16, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 17, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 21, 8, 0, 0),
        });

        const avaliability = await listProviderMonthAvaliabilityService.execute(
            {
                provider_id: 'user',
                year: 2020,
                month: 5,
            },
        );

        expect(avaliability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 22, available: true },
            ]),
        );
    });
});
