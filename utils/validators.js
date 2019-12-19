const {body} = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Введите корректный Email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    return Promise.reject('Такой email уже занят');
                }
            } catch (e) {
                console.log(e);
            }
        }).normalizeEmail(),
    body('password')
        .isLength({min: 6, max: 50})
        .withMessage('Пароль должен быть не менее 6 символов'),
    body('name')
        .isLength({min: 3, max: 50}).withMessage('Имя должно быть не менее 3 символов')
        .trim(),
];
