const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const sa2 = require('sweetalert2');
const MovesUI = require('../helpers/Moves');

async function createTableMoves(){
    await MovesUI.load();
    MovesUI.printMoves();
}

createTableMoves();

document.getElementById('btnSaveMove').addEventListener('click',(e)=>MovesUI.add(e));