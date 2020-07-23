import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppErros';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send Forgot Password Email', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });
    it('should be able to recover the password using the email', async () => {
        const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

        await fakeUsersRepository.create({
            email: 'johnDoe@example.com',
            name: 'John Doe',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johnDoe@example.com',
        });

        expect(sendEmail).toHaveBeenCalled();
    });

    it('should be able to recover a non-existing user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johnDoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            email: 'johnDoe@example.com',
            name: 'John Doe',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'johnDoe@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
