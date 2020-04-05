import { Router } from 'express';
import multer from 'multer';

import multerconfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import Appointments from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './middlewares/auth';

const routes = new Router();
const uploads = multer(multerconfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/files', uploads.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/appointments', Appointments.store);
routes.get('/appointments', Appointments.index);
routes.delete('/appointments/:id', Appointments.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications', NotificationController.update);

export default routes;
