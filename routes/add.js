const {Router} = require('express');
const router = Router();

const Course = require('../models/course');
const auth = require('../middleware/auth');

router.get('/', auth,  (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: 'active'
    });
});

router.post('/', auth, async (req, res) => {
    const {title, price, img} = req.body;
    const course = new Course({title, price, img, userId: req.user});

    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
