const express = require('express');
const router = express.Router();

const ModelTickets = require('../model/tickets');

const ControllerTickets = require('../controller/tickets');

router.post('/agregar',
    ControllerTickets.parseRecolectionDate,
    ControllerTickets.parseDeliveryDate,
    ModelTickets.add
);

module.exports = router;