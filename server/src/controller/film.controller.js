import db from '../db';

class filmController {
    async createFilm(req, res) {
        const { film_id, title, description, duration, poster, cinema_id, time } = req.body;

        const newFilm = await db.query(
            `INSERT INTO film_cinema (film_id, title, description, duration, poster, cinema_id, time) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
            [film_id, title, description, duration, poster, cinema_id, time]
        );

        res.json(newFilm.rows[0]);
    }

    async getFilms(req, res) {
        const films = await db.query('SELECT * FROM film');

        res.json(films.rows);
    }

    async getOneFilm(req, res) {
        const id = req.params.id;
        const film = await db.query('SELECT * FROM film_cinema WHERE film_id = $1', [id]);

        res.json(film.rows[0]);
    }

    async getScheduleOfFilm(req, res) {
        const { film_id, cinema_id } = req.body;

        const times = await db.query('SELECT id, time, hall_id FROM film_cinema WHERE film_id = $1 AND cinema_id = $2', [film_id, cinema_id]);
        
        res.json(times.rows);
    }

    async updateFilm(req, res) {
        const { id, film_id, title, description, duration, poster, cinema_id, time } = req.body;

        const film = await db.query(
            `UPDATE film_cinema 
            SET film_id = $1, title = $2, description = $3, duration = $4, poster = $5, cinema_id = $6, time = $7 
            WHERE id = $8 RETURNING *`, 
            [film_id, title, description, duration, poster, cinema_id, time, id]
        );

        res.json(film.rows[0]);
    }

    async deleteFilm(req, res) {
        const id = req.params.id;
        const film = await db.query('DELETE FROM film_cinema WHERE id = $1', [id]);

        res.json(film.rows[0]);
    }
}

export default new filmController();