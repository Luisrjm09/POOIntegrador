const UI = require('../helpers/UI');
const {URL_API,URL_CLIENT} = require('../config');
const axios = require('axios');
const sa2 = require('sweetalert2');
const { Alert } = require('../helpers/alerts');

class Ticket{
    constructor(tickets){
        this.tickets = tickets;
        this.selectedTicket = null;
    }

    async fetchTickets(){
        const { data } = await axios.get(`${URL_API}ticket`);
        this.tickets = data.tickets;
        this.printInfo();
    }

    printInfo(){
        const Rows = new UI.Table(this.tickets);

        console.log(this.tickets);

        Rows.createRow('bodyServices',['idTicket','descripcion','cotizacion','receptionDate','deliveryDate','payMethod','descriptionStatus','totalPago'],'idTicket');
        Rows.addActions('bodyServices',['fas fa-trash-alt','fas fa-pen'],['deleteTicket','editTicket']);


        document.querySelectorAll('.deleteTicket').forEach(button=>{
            button.addEventListener('click',(e)=>this.openConfirmDelete(e));
        });   

        document.querySelectorAll('.editTicket').forEach(button=>{
            button.addEventListener('click',(e)=>this.editTicket(e));
        }); 
    }

    editTicket(e){
        // console.log(e);
        const idTicket = parseInt(e.target.parentNode.parentNode.parentNode.id,10);
        this.searchTicket(idTicket)
    }


    openConfirmDelete(e){
        let idTicket = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
        idTicket = parseInt(idTicket,10);
        this.selectedTicket = this.tickets.find(ticket=>ticket.idTicket === idTicket);
        sa2.fire({
            title:`Estas seguro de borrar el ticket ${this.selectedTicket.idTicket}?`,
            icon:'warning',
            showCancelButton:true,
            cancelButtonText:'No',
            confirmButtonText:'Si'
        }).then(result=>{
            if(result.isConfirmed){
                this.delete(this.selectedTicket.idTicket);
            }
        })
    }

    fillModalEdit(){
        document.getElementById('editFirstName').value = this.selectedClient.primerNombre;
        document.getElementById('editMiddlename').value = this.selectedClient.segundoNombre;
        document.getElementById('editLastname1').value = this.selectedClient.apellidoPaterno;
        document.getElementById('editLastname2').value = this.selectedClient.apellidoMaterno;
        document.getElementById('editClientPhone').value = this.selectedClient.numero; 
        document.getElementById('idClient').value = this.selectedClient.idCliente;
    }

    async delete(idTicket){
        try {

            console.log(idTicket);

            const { data } = await axios.post(`${URL_API}ticket/borrar`,{
                idTicket
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

    async searchTicket(ticketID){
        try {
            
            const { data } = await axios.get(`${URL_API}ticket/buscar/${ticketID}`);

            if(data.status===200){               
                localStorage.setItem('ticketFounded',JSON.stringify(data));
                window.location.href = `${URL_CLIENT}editarTicket.html`;
                return;
            }

            document.getElementById('errorSearchTicket').classList.remove('d-none');

            setTimeout(()=>{
                document.getElementById('errorSearchTicket').classList.add('d-none');
            },3000);

        } catch (error) {
            console.log(error);
        }
    }
}

const TicketUI = new Ticket();
TicketUI.fetchTickets();

document.getElementById('btnSearchTicket').addEventListener('click', e =>{
    e.preventDefault();

    const ticketID = parseInt(document.getElementById('ticketID').value,10);

    TicketUI.searchTicket(ticketID);
})