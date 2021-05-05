const express = require('express');
const router = express.Router();
const ModelClient = require('../model/clients');
const ControllerClients = require('../controller/clients');

router.post('/agregar',
    ModelClient.addClient
);

router.get('/',
    ModelClient.getClients,
    ControllerClients.generateFullName
);

router.post('/borrar',
    ModelClient.deleteClient
);

router.post('/editar',
    ModelClient.editClient
);

module.exports = router;