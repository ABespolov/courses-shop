const keys = require('../keys');

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Аккаунт успешно создан',
        html: `<h1>Добро пожаловать в наш магазин</h1>
               <p>Вы успешно создали аккаунт <strong>${email}</strong></p>
               <hr/>
               <a href="${keys.BASE_URL}">Магазин курсов</a>`
    }
};
