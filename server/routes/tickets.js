const express = require('express');
const router = express.Router();

const ModelTickets = require('../model/tickets');

const ControllerTickets = require('../controller/tickets');

router.post('/agregar',
    ControllerTickets.parseRecolectionDate,
    ControllerTickets.parseDeliveryDate,
    ModelTickets.add,
    ModelTickets.saveStatesTicket
);

router.post('/editar',
    ControllerTickets.parseRecolectionDate,
    ControllerTickets.parseDeliveryDate,
    ModelTickets.update
);

router.get('/',
    ModelTickets.get,
    ControllerTickets.joinDates,
    ControllerTickets.joinPayMethod
);

router.post('/borrar',
    ModelTickets.delete
);

router.get('/buscar/:idTicket',
    ModelTickets.find,
    ModelTickets.findState
);

module.exports = router;