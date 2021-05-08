const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const HelperServices = require('../helpers/HelperServices');
const { Alert } = require('../helpers/alerts');
 
class Services {

    constructor(services){
        this.services = services;
        this.paymentMethod = 0;
    }

    async get(){
        try {
            const { data } = await axios.get(`${URL_API}servicios`); 
            this.services = data.services;
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

class Ticket extends HelperServices{
    constructor(ticket,equipmentState){
        super();
        this.ticket = ticket;
        this.equipmentState = [];
        this.paymentMethod = 0;
        this.clients = [];
        this.selectedClient;

    }

    async save(){
        try {
            this.payMethod();
            this.statusEquipment();
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
            const idClientSelected = document.getElementById('idClientSelected').value;

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
                service,
                idClientSelected,
                equipmentState:this.equipmentState
            });
            
            if(data.status===200){
                Alert.querySuccess(data.message);
                return;
            }

            Alert.queryError(data.error.sqlMessage);
            

        } catch (error) {
            console.log(error);
        }
    }

    async addClient(){
        const firstName = document.getElementById('addFirstName').value;
        const middlename = document.getElementById('addMiddlename').value;
        const lastName1 = document.getElementById('addLastname1').value; 
        const lastName2 = document.getElementById('addLastname2').value; 
        const clientPhone = document.getElementById('addClientPhone').value; 
        let recommendation = 0;

        document.querySelectorAll('.addRecommendation input').forEach(input=>{
            {input.checked ? recommendation = input.value : null;}
        });

        try {
            const { data } = await axios.post(`${URL_API}clientes/agregar`,{
                firstName,
                middlename,
                lastName1,
                lastName2,
                clientPhone,
                recommendation
            });

            if(data.status===200){
                Alert.querySuccess(data.message);
                return;
            }

            Alert.queryError(data.error);

        } catch (error) {
            console.log(error);    
        }
    }


    printClients(){
        let htmlOptions = `<option selected="true" disabled="">-- SELECCIONA CLIENTE -- (OPCIONAL)</option>`;

        this.clients.map(client=>{
            htmlOptions+=`<option value="${client.idCliente}" id="client-${client.idCliente}">${client.fullName}</option>`;
        });

        document.getElementById('listClients').innerHTML = htmlOptions;
    }

    setFieldsClient(e){
        const clientId = parseInt(e.target.value,10);

        this.selectedClient = this.clients.find(client=>client.idCliente === clientId);
        
        document.getElementById('ticketFirstName').value = this.selectedClient.primerNombre;
        document.getElementById('ticketMiddlename').value = this.selectedClient.segundoNombre;
        document.getElementById('ticketLastname1').value = this.selectedClient.apellidoPaterno;
        document.getElementById('ticketLastname2').value = this.selectedClient.apellidoMaterno;
        document.getElementById('ticketPhone').value = this.selectedClient.numero;
        document.getElementById('idClientSelected').value = this.selectedClient.idCliente;
        
    }

    payMethod(){
        document.querySelectorAll('#payMethod input').forEach(input=>{
            {input.checked? this.paymentMethod = input.value : null;}
        });
    }

    statusEquipment(){

        let tempJSON;
        let tempCheck;

        document.querySelectorAll('#stateEquipment input').forEach(checkbox=>{

            {checkbox.checked? tempCheck = 1 : tempCheck = 0}

            tempJSON = {
                "idTicketsEstado":null,
                "idEstadoTicketNombre":checkbox.id,
                "ticketCorresponde":0,
                "estado":tempCheck
            }
            this.equipmentState.push(tempJSON);
        });


        console.log(this.equipmentState);
    }
}

// const ClientUI = new Client();
const TicketUI = new Ticket();
const ServicesUI = new Services();

//////////////////// [GET LIST OF CLIENTS] //////////////////////
const clients = async() => {
    const result = await TicketUI.getClients();
    TicketUI.clients = result;
    TicketUI.printClients();
}

clients();

///////////////////[GET LIST OF SERVICES] //////////////////////
const services = async() => {
    await ServicesUI.get();
    await ServicesUI.print('servicesList');
}

services();

///////////////// [SAVE TICKET] //////////////////////////////////
document.getElementById('btnSaveTicket').addEventListener('click',()=>TicketUI.save());

document.getElementById('btnAddClient').addEventListener('click',()=>TicketUI.addClient());

////////////////// [SET INFO OF CLIENT ON FIELDS] //////////////////////
document.getElementById('listClients').addEventListener('click',(e)=>{TicketUI.setFieldsClient(e)});