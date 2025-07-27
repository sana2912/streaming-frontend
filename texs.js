const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/User');

const app = express();
app.use(express.urlencoded({ extended: true }));

// --- SESSION ---
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: false,
}));

// --- PASSPORT INIT ---
app.use(passport.initialize());
app.use(passport.session());

// --- PASSPORT CONFIG ---
passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Wrong password' });

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// --- MONGOOSE CONNECT ---
mongoose.connect('mongodb://localhost/passport-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// --- REGISTER ROUTE ---
app.post('/register', async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
    });
    await newUser.save();

    // 🔥 AUTO LOGIN AFTER REGISTER
    req.login(newUser, (err) => {
        if (err) return next(err);
        return res.send('Registered and logged in!');
    });
});

// --- LOGIN ROUTE ---
app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login-failed',
}));

// --- PROTECTED ROUTE ---
app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello ${req.user.username}, welcome to your profile.`);
    } else {
        res.redirect('/login-failed');
    }
});

// --- LOGOUT ---
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.send('Logged out');
    });
});

// --- FAIL PAGE ---
app.get('/login-failed', (req, res) => {
    res.send('Login failed');
});

// --- START SERVER ---
app.listen(3000, () => console.log('Server running on http://localhost:3000'));