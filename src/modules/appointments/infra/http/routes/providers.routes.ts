import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProviersController';

const providersRoute = Router();
const providersController = new ProvidersController();

providersRoute.use(ensureAuthenticated);

// providersRoute.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

providersRoute.get('/', providersController.index);

export default providersRoute;
