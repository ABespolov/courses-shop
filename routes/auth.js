const {Router} = require('express');
const router = Router();

const User = require('../models/user');
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('./auth/login', {
        title: 'Авторизация',
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    })
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (user) {
            const areSame = await bcrypt.compare(password, user.password);

            if (areSame) {
                req.session.user = user;
                req.session.isAuthenticated = true;

                req.session.save((err) => {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/');
                });
            } else {
                req.flash('loginError', 'Неверный пароль');
                res.redirect('/auth/login#login');
            }
        } else {
            req.flash('loginError', 'Такого пользователя не существует');
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/register', async (req, res) => {
    try {
        const {name, email, password, repeat} = req.body;
        const candidate = await User.findOne({email});

        if (candidate) {
            req.flash('registerError', 'Пользователь с таким email уже существует');
            res.redirect('/auth/login#register');
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({name, email, password: hashPassword, cart: {items: []}});

            await user.save();
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
