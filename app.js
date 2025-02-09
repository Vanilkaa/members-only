const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const db = require('./db/queries');

const customFields = {
    usernameField: 'mail',
    passwordField: 'password',
}

const verifyCallback = async (username, password, done) => {
    try {
            const user = await db.getUserByMail(username);

            if (!user) {
                return done(null, false, { message: 'Incorrect mail' });
            }
            const match = await bcrypt.compare(password+user.salt, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById(id);

        done(null, user);
    } catch(err) {
        done(err);
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false}));
app.use(passport.session());


const indexRouter = require('./routes/indexRouter');
const { verify } = require('crypto');

app.use('/', indexRouter);
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
}));
app.post('/signup', (req, res, next) => {
    if (!res.locals.errors) {
        next();
        return;
    }
    res.redirect('/signup');
},
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
}));
app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
