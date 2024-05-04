import db from '../db';

class cinemaController {
    async createCinema(req, res) {
        const { title, coords, rating } = req.body;

        const newFilm = await db.query(
            `INSERT INTO cinema (title, coords, rating) 
            VALUES ($1, $2, $3) RETURNING *`, 
            [title, coords, rating]
        );

        res.json(newFilm.rows[0]);
    }

    async getAllCinema(req, res) {
        const allCInema = await db.query('SELECT * FROM cinema');

        res.json(allCInema.rows);
    }

    async getOneCinema(req, res) {
        const id = req.params.id;
        const cinema = await db.query('SELECT * FROM cinema WHERE id = $1', [id]);

        res.json(cinema.rows[0]);
    }

    async updateCinema(req, res) {
        const { id, title, coords, rating } = req.body;

        const cinema = await db.query(
            'UPDATE cinema SET title = $1, coords = $2, rating = $3 WHERE id = $4 RETURNING *', 
            [title, coords, rating, id]
        );

        res.json(cinema.rows[0]);
    }

    async deleteCinema(req, res) {
        const id = req.params.id;
        const cinema = await db.query('DELETE FROM cinema WHERE id = $1', [id]);

        res.json(cinema.rows[0]);
    }
}

export default new cinemaController();