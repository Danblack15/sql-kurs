import { Router } from 'express';
import hallController from '../controller/hall.controller';

const hallRouter = Router();


hallRouter.post('/hall', hallController.createHall);
hallRouter.post('/oneHall', hallController.getHall);

export { hallRouter };