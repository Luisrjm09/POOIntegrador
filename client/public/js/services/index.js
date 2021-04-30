const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const sa2 = require('sweetalert2');

const deleteService = () => {
    console.log('asdasdas');
}

try {
    const services = async() =>{
        const {data} = await axios.get(`${URL_API}servicios`); 
        const services = data.services;
        const Rows = new UI.Table(services);
        Rows.createRow('bodyServices');
        Rows.addActions('bodyServices',['fas fa-trash-alt deleteService','fas fa-pen editService']);

        document.querySelectorAll('.deleteService').forEach(button=>{
            button.addEventListener('click',()=>{
                alert('123');
            })
        })
    }   

    services();
} catch (error) {
    console.log(`There was an error ${error}`);
}

async function addService(){
    try {
        console.log(`Enviando informacion...`);
        const name = document.getElementById('serviceName').value;
        const description = document.getElementById('serviceDescription').value;

        const { data } = await axios.post(`${URL_API}servicios`,{
            name,
            description
        });

        if(data.status===200){
            sa2.fire({
                title:data.message,
                icon:'success'
            }).then(result=>{
                if(result.isConfirmed){
                    document.getElementById('formServices').reset();
                    window.location.reload(true);
                }
            });
        }else{
            sa2.fire({
                title:data.error,
                icon:'error'
            });
        }

    } catch (error) {
        console.log(error);
    }
}

document.getElementById('btnAddService').addEventListener('click',()=>addService());