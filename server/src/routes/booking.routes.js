import { Router } from 'express';
import bookingController from '../controller/booking.controller';

const bookingRouter = Router();


bookingRouter.post('/booking', bookingController.createBooking);

export { bookingRouter };