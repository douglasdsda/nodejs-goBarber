import { Router } from 'express';
import multer from 'multer';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUsersService);

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
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
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
