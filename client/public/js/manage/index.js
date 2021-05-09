const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const sa2 = require('sweetalert2');
const { getActualDate } = require('../helpers/date');

const today = getActualDate();

document.getElementById('actualDate').innerHTML = today.stringDate;