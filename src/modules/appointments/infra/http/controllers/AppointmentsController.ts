import { Request, Response } from 'express';
// import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { classToClass } from 'class-transformer';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;

        // const parsedDate = parseISO(date); //convert in date

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date,
            user_id,
            provider_id,
        });
        return response.json(classToClass(appointment));
    }
}
