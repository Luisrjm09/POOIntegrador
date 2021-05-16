const HelperServices = require('../helpers/HelperServices');
const UI = require('../helpers/UI');
const { Ticket } = require('../helpers/Ticket');
const axios = require('axios');
const {URL_API} = require('../config');


class Services {

    constructor(services){
        this.services = services;
        this.paymentMethod = 0;
    }

    async get(){
        try {
            const { data } = await axios.get(`${URL_API}servicios`); 
            this.services = data.services;

            return data.services;
        } catch (error) {
            console.log(error);
        }
    }

    print(selectParent){
        let optionsDOM = `<option value="" disabled="" selected="true">-- SELECCIONA --</option>`;

        this.services.map(service=>{
            optionsDOM+=`<option value="${service.idServicio}">${service.nombre}</option>`;
        });

        document.getElementById(selectParent).innerHTML = optionsDOM;
    }
}

const TicketUI = new Ticket(JSON.parse(localStorage.getItem('ticketFounded')));
const ServicesUI = new Services();

const initialLoad = async() => {
    const services = await ServicesUI.get();
    await ServicesUI.print('servicesList');
    console.log(TicketUI);
    TicketUI.setInputs();
    const clients = await TicketUI.getClients();
    TicketUI.printClients(clients);
    TicketUI.setClient(clients);
}

initialLoad();

////////////////// [SET INFO OF CLIENT ON FIELDS] //////////////////////
document.getElementById('listClients').addEventListener('click',(e)=>{TicketUI.setFieldsClient(e)});

document.getElementById('btnSaveTicket').addEventListener('click',()=>TicketUI.save());