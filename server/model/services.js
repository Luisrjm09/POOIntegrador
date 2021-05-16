const db = require('../config');

class Services{
    async fetchServices(request,response,next){
        await db.query(`SELECT * FROM servicios ORDER by nombre ASC`,(error,results,columns)=>{
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

    async deleteService(request,response,next){
        console.log(`■ Deleting from db...`);

        await db.query('DELETE FROM servicios WHERE id = ?',
        request.params.idService,
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    message:error
                })
            }

            return response.json({
                status:200,
                message:`Eliminado correcto`
            });

        })
    }

    async editService(request,response,next){
        console.log(`■ Editing user...`);

        const {updatedDescription,updateName,idService} = request.body;

        await db.query(`UPDATE servicios SET nombre = ? , descripcion = ? WHERE id = ?`,
            [updateName,updatedDescription,idService],
            (error,result,columns)=>{
                if(error){
                    return response.json({
                        status:500,
                        message:error
                    });
                }
                return response.json({
                    status:200,
                    message:`Servicio actualizado`
                });
            })
    }
}

const ModelServices = new Services();

module.exports = ModelServices;