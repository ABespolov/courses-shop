const keys = require('../keys');

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Восстановление доступа',
        html: `<p>Ссылка для восстановления пароля:</p>
               <a href="${keys.BASE_URL}/auth/password/${token}">Восстановить доступ</a> `
    }
};
