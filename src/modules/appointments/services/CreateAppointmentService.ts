import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '@shared/errors/AppErros';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import User from '@modules/users/infra/typeorm/entities/User';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
// recebimento, tratamento de erro e acesso ao repositorio

interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({
        date,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { id: provider_id },
        });

        if (!user) {
            throw new AppError('User not existis');
        }

        const appointment = await appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
