import { startOfHour, isBefore, getHours, format } from 'date-fns';

import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppErros';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
// recebimento, tratamento de erro e acesso ao repositorio

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        date,
        user_id,
        provider_id,
    }: IRequest): Promise<Appointment> {
        if (user_id === provider_id) {
            throw new AppError(
                "You can't create an appointment on same user as provider.",
            );
        }

        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create an appointment on a past date.",
            );
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                'Yout can only create appointments between 8am and 5pm',
            );
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm");

        await this.notificationsRepository.create({
            content: `Novo agendamento para dia ${dateFormatted}h `,
            recipient_id: provider_id,
        });

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(
                appointmentDate,
                'yyyy-M-d',
            )}`,
        );

        return appointment;
    }
}

export default CreateAppointmentService;
