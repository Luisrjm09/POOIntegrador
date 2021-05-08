const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const sa2 = require('sweetalert2');

class Ticket{
    constructor(tickets){
        this.tickets = tickets;
    }

    async fetchTickets(){
        const { data } = await axios.get(`${URL_API}ticket`);
        this.tickets = data.tickets;
        this.printInfo();
    }

    printInfo(){
        const Rows = new UI.Table(this.tickets);

        console.log(this.tickets);

        Rows.createRow('bodyServices',['id','servicio','cotizacion','receptionDate','deliveryDate','payMethod','estadoEquipo','totalPago'],'id');
        Rows.addActions('bodyServices',['fas fa-trash-alt','fas fa-pen'],['deleteTicket','editTicket']);

    }
}

const TicketUI = new Ticket();
TicketUI.fetchTickets();