import { Router } from 'express';
import multer from 'multer';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersRepository from '../../repositories/UsersRepository';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const userRepository = new UsersRepository();
    const createUser = new CreateUsersService(userRepository);

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

userRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const userRepository = new UsersRepository();
        const updateUserAvatarService = new UpdateUserAvatarService(
            userRepository,
        );

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);

export default userRouter;
