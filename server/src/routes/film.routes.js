import { Router } from 'express';
import filmController from '../controller/film.controller';

const filmRouter = Router();


filmRouter.post('/film', filmController.createFilm);
filmRouter.get('/film', filmController.getFilms);
filmRouter.get('/film/:id', filmController.getOneFilm);
filmRouter.put('/film', filmController.updateFilm);
filmRouter.delete('/film/:id', filmController.deleteFilm);

filmRouter.post('/film/schedule', filmController.getScheduleOfFilm);

export { filmRouter };