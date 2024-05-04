import express, { json } from 'express';
import cors from 'cors';

import 'dotenv/config';
import cookieParser from 'cookie-parser'

// Routes
import { userRouter } from './routes/user.routes';
import { filmRouter } from './routes/film.routes';
import { cinemaRouter } from './routes/cinema.routes';
import { hallRouter } from './routes/hall.routes';
import { bookingRouter } from './routes/booking.routes';

// Global Var
const PORT = process.env.PORT || 5000;
const app = express();


// Usage
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.use('/api', userRouter);
app.use('/api', filmRouter);
app.use('/api', cinemaRouter);
app.use('/api', hallRouter);
app.use('/api', bookingRouter);


// Body
app.listen(PORT, () => {
    console.log('Server is started!');
    console.log('For start in NGROK: <ngrok start --all>');
    console.log('yml-file in C:/Users/fedor/AppData/Local/ngrok');
    console.log(`http://localhost:${PORT}\n`);
});