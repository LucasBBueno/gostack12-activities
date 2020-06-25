import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// Toda rota que começar com appointments será direcionada para o appointmentsRouter
routes.use('/appointments', appointmentsRouter);

export default routes;
