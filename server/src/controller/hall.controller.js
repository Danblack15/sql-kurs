import db from '../db';

class hallController {
    async createHall(req, res) {
        const { columns, rows, cinema_id } = req.body;

        const newHall = await db.query(
            `INSERT INTO hall (columns, rows, cinema_id) 
            VALUES ($1, $2, $3) RETURNING *`, 
            [columns, rows, cinema_id]
        );

        res.json(newHall.rows[0]);
    }

    async getHall(req, res) {
        const { hall_id, cinema_film_id } = req.body;

        const bookingOfHall = await db.query(`
            SELECT "column", row FROM booking 
            WHERE hall_id = $1 AND film_cinema_id = $2 AND status = 'current'`, 
            [hall_id, cinema_film_id]
        ); // Все заказы, связанные с id зала и фильмом кинотаетра (filM_CINEMA_ID) и статусом 'current'

        const hall = await db.query(`SELECT * FROM hall WHERE id = $1`, [hall_id]); // Зал

        const hallData = {
            busySeats: bookingOfHall.rows,
            hall: hall.rows[0]
        }

        res.json(hallData);
    }
}

export default new hallController();