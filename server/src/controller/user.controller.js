import db from '../db';

class userController {
    async createUser(req, res) {
        const { name, phone, email } = req.body;

        const newUser = await db.query(
            'INSERT INTO person (name, phone, email) VALUES ($1, $2, $3) RETURNING *', 
            [name, phone, email]
        );

        res.json(newUser.rows[0]);
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM person');

        res.json(users.rows);
    }

    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM person WHERE id = $1', [id]);

        res.json(user.rows[0]);
    }

    async updateUser(req, res) {
        const { id, name, phone, email } = req.body;
        const user = await db.query(
            'UPDATE person SET name = $1, phone = $2, email = $3 WHERE id = $4 RETURNING *', 
            [name, phone, email, id]
        );

        res.json(user.rows[0]);
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM person WHERE id = $1', [id]);

        res.json(user.rows[0]);
    }

    async loginUser(req, res) {
        const { user_name } = req.body;

        const user = await db.query('SELECT * FROM person WHERE name = $1', [user_name]);

        res.json(user.rows[0]);
    }

    async userBooking(req, res) {
        const { user_id } = req.body;

        // const bookingList = await db.query('SELECT * FROM booking WHERE user_id = $1', [user_id]);
        const bookingList = await db.query(`
            SELECT *, cinema.title AS cinema_title FROM booking 
                JOIN cinema ON user_id = $1 AND booking.cinema_id = cinema.id
                JOIN film_cinema ON booking.film_cinema_id = film_cinema.id
                ORDER BY booking.time`, [user_id]);

        res.json(bookingList.rows);
    }
}

export default new userController();