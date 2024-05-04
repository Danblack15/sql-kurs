import { Router } from 'express';
import hallController from '../controller/hall.controller';

const hallRouter = Router();


hallRouter.post('/hall', hallController.createHall);
hallRouter.get('/hall/:id', hallController.getHall);

export { hallRouter };