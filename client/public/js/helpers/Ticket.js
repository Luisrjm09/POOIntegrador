const { Alert } = require('../helpers/alerts');
const axios = require('axios');
const HelperServices = require('../helpers/HelperServices');
const { URL_API, URL_CLIENT } = require('../config');

class Ticket extends HelperServices {
    constructor(ticket) {
        super();
        this.ticket = ticket;
        this.clients = [];
        this.selectedClient;
        this.equipmentState = [];
        this.paymentMethod = 0;

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

    printClients(clients){
        let htmlOptions = `<option selected="true" disabled="">-- SELECCIONA CLIENTE -- (OPCIONAL)</option>`;

        this.clients.map(client=>{
            htmlOptions+=`<option value="${client.idCliente}" id="client-${client.idCliente}">${client.fullName}</option>`;
        });

        document.getElementById('listClients').innerHTML = htmlOptions;
    }

    setInputs() {

        let monthReception = ``;
        let dayReception = ``;

        if (this.ticket.ticketInfo[0].mesRecoleccion < 10) {
            monthReception = `0${this.ticket.ticketInfo[0].mesRecoleccion}`;
        } else {
            monthReception = this.ticket.ticketInfo[0].mesRecoleccion;
        }

        if (this.ticket.ticketInfo[0].diaRecoleccion < 10)
            dayReception = `0${this.ticket.ticketInfo[0].diaRecoleccion}`;
        else {
            dayReception = this.ticket.ticketInfo[0].diaRecoleccion;
        }

        const receptionDate = `${this.ticket.ticketInfo[0].recolectionYear}-${monthReception}-${dayReception}`;

        if(this.ticket.ticketInfo[0].idTicket!=0){
            document.getElementById('listClients').value = this.ticket.ticketInfo[0].clienteId;  
        }

        document.getElementById('idTicket').textContent = this.ticket.ticketInfo[0].idTicket;
        document.getElementById('model').value = this.ticket.ticketInfo[0].modelo;
        document.getElementById('description').value = this.ticket.ticketInfo[0].descripcion;
        document.getElementById('price').value = this.ticket.ticketInfo[0].cotizacion;
        document.getElementById('total').value = this.ticket.ticketInfo[0].totalPago;
        document.getElementById('receptionDate').value = receptionDate;
        document.getElementById('ticketPhone').value = this.ticket.ticketInfo[0].numeroCliente;
        document.getElementById('repairState').value = this.ticket.ticketInfo[0].estadoReparacion;
        document.getElementById('servicesList').value = this.ticket.ticketInfo[0].servicio;
        document.getElementById('fabricant').value = this.ticket.ticketInfo[0].marca;
        document.getElementById('idClientSelected').value = this.ticket.ticketInfo[0].clienteId;

        this.setStateEquipment(this.ticket.estatusEquipment[0],"1");
        this.setStateEquipment(this.ticket.estatusEquipment[1],"2");
        this.setStateEquipment(this.ticket.estatusEquipment[2],"3");
        this.setStateEquipment(this.ticket.estatusEquipment[3],"4");

        this.setPayMethod(this.ticket.ticketInfo[0].medioPagoId);

        const [dayDelivery,monthDelivery] = this.parseInputDate(this.ticket.ticketInfo[0].mesEntrega,this.ticket.ticketInfo[0].diaEntrega);

        document.getElementById('deliveryDate').value = `${this.ticket.ticketInfo[0].entregaYear}-${monthDelivery}-${dayDelivery}`;
    }

    setStateEquipment(json,checkID){
        if(json.estado===1){
            document.getElementById(checkID).checked = true;
        }
    }

    setPayMethod(payMethod){
        /* Cash */
        if(payMethod === 1){
            document.getElementById('cash').checked = true;
        }
        /* Credit Card */
        else{
            document.getElementById('creditCard').checked = true;
        }
    }

    parseInputDate(month,day){
        let monthString = ``;
        let dayString = ``;


        if (month < 10) {
            monthString = `0${month}`;
        } else {
            monthString = `${month}`;
        }

        if(day<10){
            dayString = `0${day}`;
        }else{
            dayString = `${day}`;
        }

        return [dayString,monthString];
    }

    setClient(clients){
        if(this.ticket.ticketInfo[0].clienteId===0){
            return;
        }

        

        const selectedClient = clients.find(client=>client.idCliente===this.ticket.ticketInfo[0].clienteId);
        console.log(selectedClient);

        document.getElementById('listClients').value = selectedClient.idCliente;

        document.getElementById('ticketFirstName').value = selectedClient.primerNombre;
        document.getElementById('ticketMiddlename').value = selectedClient.segundoNombre;
        document.getElementById('ticketLastname1').value = selectedClient.apellidoPaterno;
        document.getElementById('ticketLastname2').value = selectedClient.apellidoMaterno;
        
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

    async save(){

        console.log(`Updating ticket...`);

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
            const fabricant = document.getElementById('fabricant').value;
            const deliveryDate = document.getElementById('deliveryDate').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const total = document.getElementById('total').value;
            const repairState = document.getElementById('repairState').value;
            const service = document.getElementById('servicesList').value;
            const idClientSelected = document.getElementById('idClientSelected').value;


            const { data } = await axios.post(`${URL_API}ticket/editar`,{
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
                equipmentState:this.equipmentState,
                fabricant,
                ticketId :this.ticket.ticketInfo[0].idTicket
            });
            
            if(data.status===200){
                Alert.querySuccesRedirect(data.message,`${URL_CLIENT}tickets.html`);

                return;
            }

            Alert.queryError(data.error.sqlMessage);
            

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = {
    Ticket
};