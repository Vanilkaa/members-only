const { render, redirect } = require("express/lib/response");
const dotenv = require('dotenv');
const db = require('../db/queries');
dotenv.config();

module.exports = {
    index: async (req, res) => {
        res.locals.user = req.user;
        const messages = await db.getMessages();
        res.render('index', { messages });
    },
    login: (req, res) => {
        res.render('login.ejs');
    },
    signup: (req, res) => {
        res.render('signup.ejs');
    },
    joinclub: (req, res) => {
        if (req.user) {
            res.render('joinClub.ejs');
        } else res.send(401, 'Not logged in')
    },
    joinclubcheck: (req, res) => {
        if (req.body.code == process.env.CLUBCODE) {
            db.chageUserSatus(req.user.id, 'member');
        }
        res.redirect('/');
    },
    createMessage: (req, res) => {
        if (req.user) {
            res.render('createMessage.ejs');
        } else res.send(401, 'Not logged in')
    },
    postMessage: (req, res) => {
        db.insertMessage(req.body.title, req.body.text, req.user.id);
        res.redirect('/');
    },
    deleteMessage: (req, res) => {
        if (req.user && req.user.status == 'admin') db.deleteMessage(req.params.messageId);
        res.redirect('/');
    }
}