const express = require('express');
const router = express.Router();
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const indexController = require('../controllers/indexController');
const signupController = require('../controllers/signupController');

router.get('/', indexController.index);
router.get('/signup', indexController.signup);
router.get('/login', indexController.login);
router.get('/joinclub', indexController.joinclub);
router.post('/joinclub', indexController.joinclubcheck);
router.get('/createmessage', indexController.createMessage);
router.post('/createmessage', indexController.postMessage);
router.get('/delete/:messageId', indexController.deleteMessage);
router.post('/signup', body('mail').custom(async value => {
    const user = await db.getUserByMail(value);
    if (user) {
        throw new Error('E-mail already in use');
    }
}), (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.locals.errors = errors.errors;
        }
        next();
    }, signupController.signup)
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
})


module.exports = router;