const express = require('express');
const router = express.Router();

const UserModel = require('../model/users');
const UserController = require('../controller/users');

router.post('/',
    UserController.encryptPass,
    UserModel.signUp
);

router.post('/login',
    UserModel.userCredentials,
    UserController.validatePass
);

module.exports = router;