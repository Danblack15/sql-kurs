import { Router } from 'express';
import cinemaController from '../controller/cinema.controller';

const cinemaRouter = Router();


cinemaRouter.post('/cinema', cinemaController.createCinema);
cinemaRouter.get('/cinema', cinemaController.getAllCinema);
cinemaRouter.get('/cinema/:id', cinemaController.getOneCinema);
cinemaRouter.put('/cinema', cinemaController.updateCinema);
cinemaRouter.delete('/cinema/:id', cinemaController.deleteCinema);

export { cinemaRouter };