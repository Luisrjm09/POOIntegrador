const express = require('express');
const router = express.Router();
const ModelServices = require('../model/services');

router.get('/',
    ModelServices.fetchServices
)

router.get('/borrar/:idService',
    ModelServices.deleteService
)

router.post('/',
    ModelServices.addService
)

router.post('/editar',
    ModelServices.editService
)

module.exports = router;