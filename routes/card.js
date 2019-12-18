const {Router} = require('express');
const router = Router();

const Course = require('../models/course');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const user = await req.user.populate('cart.items.courseId').execPopulate();

    const courses = user.cart.items.map(el => ({
        ...el.courseId._doc,
        id: el.courseId.id,
        count: el.count
    }));

    const price = user.cart.items.reduce((acc, el) => acc += +el.courseId.price, 0);

    res.render('card', {
        title: `Корзина`,
        isCard: 'active',
        price,
        courses
    });
});

router.post('/add', auth, async (req, res) => {
    const course = await Course.findById(req.body.id);

    await req.user.addToCart(course);
    res.redirect('/card');
});

router.delete('/remove/:id', auth, async (req, res) => {
    const user = await req.user.removeFromCart(req.params.id);

    res.status(200).json(user.cart);
});

module.exports = router;
