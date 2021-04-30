const { response } = require('express');
const express = require('express');
const router = express.Router();
const ModelServices = require('../model/services');

router.get('/',
    ModelServices.fetchServices
)

router.post('/',
    ModelServices.addService
)

module.exports = router;