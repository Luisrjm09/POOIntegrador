const express = require('express');
const router = express.Router();

const ModelMoves = require('../model/moves');
const ControllerMoves = require('../controller/move');

router.post('/',
    ModelMoves.add
);

router.get('/',
    ModelMoves.get,
    ControllerMoves.parseMoves
);

module.exports = router;