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
        const hallId = req.params.id;

        const bookingOfHall = await db.query(`
            SELECT "column", row FROM booking 
            WHERE hall_id = $1 AND status = 'current'`, 
            [hallId]
        ); // Все заказы, связанные с id зала и статусом 'current'

        const hall = await db.query(`SELECT * FROM hall WHERE id = $1`, [hallId]); // Зал

        const hallData = {
            busySeats: bookingOfHall.rows,
            hall: hall.rows[0]
        }

        res.json(hallData);
    }
}

export default new hallController();