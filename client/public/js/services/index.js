const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const sa2 = require('sweetalert2');

const deleteService = (e) => {

    const deleteDB = async () =>{
        try {
            const {data} = await axios.get(`${URL_API}servicios/borrar/${id}`);

            if(data.status===200){
                sa2.fire({
                    title:data.message,
                    icon:'success'
                }).then(result=>{
                    if(result.isConfirmed){
                        document.getElementById(idRow).remove();
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    let jsonService = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('value');
    const idRow = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    const {id,nombre} = JSON.parse(jsonService);

    sa2.fire({
        title:`Estas seguro de borrar '${nombre}'?`,
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'No',
        confirmButtonText:'Si'
    })
    .then(result=>{
        if(result.isConfirmed){
            deleteDB();
        }
    });
}

const openEditService = e => {
    let jsonService = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('value');
    idService = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');

    const {id,nombre,descripcion} = JSON.parse(jsonService);
    document.getElementById('btnEditService').click();
    document.getElementById('serviceNameEdit').value = nombre;
    document.getElementById('idService').value = id;
    document.getElementById('serviceDescriptionEdit').value = descripcion;
}

const updateService = async(e) => {
    const updatedDescription = document.getElementById('serviceDescriptionEdit').value;
    const updateName = document.getElementById('serviceNameEdit').value;
    const idService = document.getElementById('idService').value;

    try{
        const { data } = await axios.post(`${URL_API}servicios/editar`,{
            updatedDescription,
            updateName,
            idService
        });

        if(data.status===200){
            sa2.fire({
                title:data.message,
                icon:'success'
            }).then(result=>{
                if(result.isConfirmed){
                    window.location.reload(true);   
                }
            })
        }

        console.log(data.response);
    }catch(error){
        console.log(error);
    }
}

try {
    const services = async() =>{
        const {data} = await axios.get(`${URL_API}servicios`); 
        const services = data.services;
        console.log(services);
        const Rows = new UI.Table(services);
        Rows.createRow('bodyServices',['idServicio','nombre','descripcion'],'id');
        Rows.addActions('bodyServices',['fas fa-trash-alt','fas fa-pen'],['deleteService','editService']);

        
        document.querySelectorAll('.deleteService').forEach(button=>{
            button.addEventListener('click',(e)=>deleteService(e))
        });     
        
        document.querySelectorAll('.editService').forEach(button=>{
            button.addEventListener('click',(e)=>openEditService(e));
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
document.getElementById('btnUpdateService').addEventListener('click',(e)=>updateService(e));