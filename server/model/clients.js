const db = require('../config');

class Client{
    async addClient(request,response,next){
        
        const { firstName,middlename,lastName1,lastName2,clientPhone,recommendation } = request.body;
        
        await db.query(`INSERT INTO clientes values (?,?,?,?,?,?,?)`,
        [null,firstName,middlename,lastName1,lastName2,clientPhone,recommendation],
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }
            return response.json({
                status:200,
                message:`Cliente agregado`
            });
        })
    }

    async getClients(request,response,next){

        console.log(`■ Fetching list of clients...`);

        await db.query(`SELECT * FROM clientes 
        INNER JOIN contacto ON contacto.idContacto = clientes.recomendadoPor
        ORDER by primerNombre ASC`,(error,result,column)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }
            request.params.clients = result;
            next();
        });
    }

    async deleteClient(request,response,next){

        const { idClient } = request.body;

        await db.query(`DELETE FROM clientes WHERE idCliente = ?`,idClient,
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }
            return response.json({
                status:200,
                message:`Usuario eliminado`
            });
        });
    }

    async editClient(request,response,next){

        const { idClient,firstName,middleName,editLastname1,editLastname2,editClientPhone } = request.body;

        await db.query(`UPDATE clientes SET
        primerNombre = ?,
        segundoNombre = ?,
        apellidoPaterno = ?,
        apellidoMaterno = ?,
        numero = ? 
        WHERE idCliente = ?
        `,[firstName,middleName,editLastname1,editLastname2,editClientPhone,idClient],
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }
            return response.json({
                status:200,
                message:`Cliente actualizado`
            });
        })
    }
}

const ModelClient = new Client();

module.exports = ModelClient;