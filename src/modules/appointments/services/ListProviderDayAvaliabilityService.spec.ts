import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvaliabilityService';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaliabilityService: ListProviderDayAvaliabilityService;

describe('ListProviderDayAvaliability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvaliabilityService = new ListProviderDayAvaliabilityService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to list the day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        const avaliability = await listProviderDayAvaliabilityService.execute({
            provider_id: 'user',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(avaliability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: true },
                { hour: 10, available: false },
                { hour: 11, available: true },
            ]),
        );
    });
});
