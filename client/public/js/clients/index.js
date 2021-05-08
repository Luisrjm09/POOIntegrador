const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const { Alert } = require('../helpers/alerts');
const sa2 = require('sweetalert2');

class Client{
    constructor(clients){
        this.clients = clients;
        this.selectedClient = null;
    }

    async add(){
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

    async get(){
        try {
            const { data } = await axios.get(`${URL_API}clientes`);
            this.clients = data.data;
            this.print();

        } catch (error) {
            console.log(error);
        }
    }

    print(){
        const Rows = new UI.Table(this.clients);
        Rows.createRow('bodyServices',['idCliente','fullName','numero','nombre'],'idCliente');
        Rows.addActions('bodyServices',['fas fa-trash-alt','fas fa-pen'],['deleteClient','editClient']);

        document.querySelectorAll('.deleteClient').forEach(button=>{
            button.addEventListener('click',(e)=>this.openConfirmDelete(e));
        });   

        document.querySelectorAll('.editClient').forEach(button=>{
            button.addEventListener('click',(e)=>this.openModal(e,'btnModalEditClient'));
        }); 
    }

    openConfirmDelete(e){
        let idClient = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
        idClient = parseInt(idClient,10);
        this.selectedClient = this.clients.find(client=>client.idCliente === idClient);
        sa2.fire({
            title:`Estas seguro de borrar a ${this.selectedClient.fullName}`,
            icon:'warning',
            showCancelButton:true,
            cancelButtonText:'No',
            confirmButtonText:'Si'
        }).then(result=>{
            if(result.isConfirmed){
                this.delete(this.selectedClient.idCliente);
            }
        })
    }

    async delete(idClient){
        try {
            const { data } = await axios.post(`${URL_API}clientes/borrar`,{
                idClient
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

    openModal(e,idBtnModal){
        let idClient = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
        idClient = parseInt(idClient,10);

        this.selectedClient = this.clients.find(client=>client.idCliente === idClient);

        this.fillModalEdit();

        document.getElementById(idBtnModal).click();
    }

    fillModalEdit(){
        document.getElementById('editFirstName').value = this.selectedClient.primerNombre;
        document.getElementById('editMiddlename').value = this.selectedClient.segundoNombre;
        document.getElementById('editLastname1').value = this.selectedClient.apellidoPaterno;
        document.getElementById('editLastname2').value = this.selectedClient.apellidoMaterno;
        document.getElementById('editClientPhone').value = this.selectedClient.numero; 
        document.getElementById('idClient').value = this.selectedClient.idCliente;
    }

    async saveEdition(){
        const idClient = document.getElementById('idClient').value;
        const firstName = document.getElementById('editFirstName').value;
        const middleName = document.getElementById('editMiddlename').value;
        const editLastname1 = document.getElementById('editLastname1').value;
        const editLastname2 = document.getElementById('editLastname2').value;
        const editClientPhone = document.getElementById('editClientPhone').value;
        
        try {
            const { data } = await axios.post(`${URL_API}clientes/editar`,{
                idClient,
                firstName,
                middleName,
                editLastname1,
                editLastname2,
                editClientPhone
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
}

const UIClient = new Client();
UIClient.get();

/* ADD NEW CLIENT */
document.getElementById('btnAddClient').addEventListener('click',()=>UIClient.add());

/* EDIT CLIENT */
document.getElementById('editUpdateClient').addEventListener('click',()=>UIClient.saveEdition());

module.exports = Client;