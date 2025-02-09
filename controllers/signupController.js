const bcrypt = require('bcryptjs');
const db = require('../db/queries');

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

module.exports = {
    signup: async (req, res, next) => {
        try {
            if (!res.locals.errors) {
                const salt = genRanHex(8);
                const hashedPassword = await bcrypt.hash(req.body.password+salt, 10);
                await db.insertUser(req.body, hashedPassword, salt);
            }
            next();
        } catch(err) {
            return next(err);
        }
    },
}