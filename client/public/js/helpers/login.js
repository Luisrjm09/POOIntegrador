const { URL_CLIENT } = require('../config');

function validateLogIn(){
    const isLogged = parseInt(localStorage.getItem('isLogged'),10);
    { isLogged === 1 ? null : window.location.href = URL_CLIENT }
}

module.exports = { validateLogIn };