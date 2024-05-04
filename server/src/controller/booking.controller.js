import db from '../db';

class bookingController {
    async createBooking(req, res) {
        const { film_cinema_id, hall_id, user_id, cinema_id, column, row, time, name, phone, email, status } = req.body;
        console.log(req.body);

        const newBooking = await db.query(
            `INSERT INTO booking (film_cinema_id, hall_id, user_id, cinema_id, "column", row, time, name, phone, email, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, 
            [film_cinema_id, hall_id, user_id, cinema_id, column, row, time, name, phone, email, status]
        );

        res.json(newBooking.rows[0]);
    }
}

export default new bookingController();