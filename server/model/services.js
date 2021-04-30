const db = require('../config');

class Services{
    async fetchServices(request,response,next){
        await db.query(`SELECT * FROM servicios`,(error,results,columns)=>{
            if(error){
                return console.log(`■ There was an erro fetching the services ${error}`);
            }
            return response.json({
                status:200,
                message:`Datos consultados con exito`,
                services:results
            });
        })
    }

    async addService(request,response,next){

        const {name,description} = request.body;

        await db.query(`INSERT INTO servicios values (?,?,?)`,[null,name,description],(error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    message:error
                })
            }
            console.log(`■ Service inserted correctly`);
            return response.json({
                status:200,
                message:`Servicio agregado correctamente`
            });
        })
    }
}

const ModelServices = new Services();

module.exports = ModelServices;