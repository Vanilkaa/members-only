
const pool = require('./pool');

async function getAllUsers() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
}

async function getUserByMail(mail) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE mail = $1`, [mail]);
    return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return rows[0];
}

async function insertUser(userData, password, salt) {
    await pool.query(`INSERT INTO users (name, lastname, mail, password, date, status, salt) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
        userData.name,
        userData.lastname,
        userData.mail,
        password,
        new Date().toISOString(),
        'user',
        salt,
    ]);
}

async function chageUserSatus(userId, status) {
    await pool.query('UPDATE users SET status = $1 WHERE id = $2', [status, userId]);
}

async function insertMessage(title, text, author) {
    await pool.query('INSERT INTO messages (title, text, author, time) VALUES ($1, $2, $3, $4)', [
        title,
        text,
        author,
        new Date().toISOString(),
    ])
}

async function getMessages() {
    const { rows } = await pool.query('SELECT * FROM users JOIN messages ON messages.author = users.id');
    return rows;
}

async function deleteMessage(messageId) {
    await pool.query('DELETE FROM messages WHERE id = $1', [messageId]);
}

module.exports = {
    getAllUsers,
    getUserByMail,
    getUserById,
    insertUser,
    chageUserSatus,
    insertMessage,
    getMessages,
    deleteMessage,
}