import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppErros';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUsersExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUsersExists) {
            throw new AppError('Email addres alredy used');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;