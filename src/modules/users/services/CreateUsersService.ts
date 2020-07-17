import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppErros';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError('Email addres alredy used');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
