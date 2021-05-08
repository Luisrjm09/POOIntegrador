const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const HelperServices = require('../helpers/HelperServices');
const { Alert } = require('../helpers/alerts');
 
class Services {

    constructor(services){
        this.services = services;
    }

    async get(){
        try {
            const { data } = await axios.get(`${URL_API}servicios`); 
            this.services = data.services;
            console.log(this.services);
        } catch (error) {
            console.log(error);
        }
    }

    print(selectParent){
        let optionsDOM = `<option value="" disabled="" selected="true">-- SELECCIONA --</option>`;

        this.services.map(service=>{
            optionsDOM+=`<option value="${service.id}">${service.nombre}</option>`;
        });

        document.getElementById(selectParent).innerHTML = optionsDOM;
    }
}

class Ticket extends HelperServices{
    constructor(ticket,equipmentState){
        super();
        this.ticket = ticket;
        this.equipmentState = equipmentState;
        this.paymentMethod = 0;
    }

    async save(){
        try {
            this.payMethod();
            const firstName = document.getElementById('ticketFirstName').value;
            const ticketMiddlename = document.getElementById('ticketMiddlename').value;
            const ticketLastname1 = document.getElementById('ticketLastname1').value;
            const ticketLastname2 = document.getElementById('ticketLastname2').value;
            const ticketPhone = document.getElementById('ticketPhone').value;
            const receptionDate = document.getElementById('receptionDate').value;
            const model = document.getElementById('model').value;
            const deliveryDate = document.getElementById('deliveryDate').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const total = document.getElementById('total').value;
            const repairState = document.getElementById('repairState').value;
            const service = document.getElementById('servicesList').value;

            const { data } = await axios.post(`${URL_API}ticket/agregar`,{
                firstName,
                ticketMiddlename,
                ticketLastname1,
                ticketLastname2,
                ticketPhone,
                receptionDate,
                model,
                deliveryDate,
                description,
                price,
                total,
                payMethod : this.paymentMethod,
                repairState,
                service
            });
            
            console.log(data);

            if(data.status===200){
                Alert.querySuccess(data.message);
                return;
            }


            Alert.queryError(data.message);
            

        } catch (error) {
            console.log(error);
        }
    }

    payMethod(){
        document.querySelectorAll('#payMethod input').forEach(input=>{
            {input.checked? this.paymentMethod = input.value : null;}
        });
    }
}

const TicketUI = new Ticket();
const ServicesUI = new Services();

///////////////////[GET LIST OF SERVICES] //////////////////////
const services = async() => {
    await ServicesUI.get();
    await ServicesUI.print('servicesList');
}

services();

///////////////// [SAVE TICKET] //////////////////////////////////
document.getElementById('btnSaveTicket').addEventListener('click',()=>TicketUI.save());