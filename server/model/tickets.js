const db = require('../config');

class Tickets{
    async add(request,response,next){
        console.log(`■ Trying to save ticket...`);

        const { firstName , ticketMiddlename , ticketLastname1 , 
            ticketLastname2 , ticketPhone, payMethod, service,
            model , description, fabricant , price , total, repairState,
            recolectionDay , recolectionMonth , recolectionYear,
            deliveryDay , deliveryMonth, deliveryYear,idClientSelected } = request.body;

        await db.query(`INSERT INTO ticket values 
        (
            ?,?,?,?,
            ?,?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,
            ?,?,?
        )`,
        [
            null,recolectionDay,recolectionMonth,recolectionYear,
            deliveryDay,deliveryMonth,deliveryYear, model,fabricant,
            description,service,price,1,
            payMethod,total,idClientSelected,repairState,
            1, `${firstName} ${ticketMiddlename} ${ticketLastname1} ${ticketLastname2}`,ticketPhone
        ],(error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }
            request.body.ticketId = result.insertId;
            console.log(`Ticket saved!`);
            next();
        });

    }

    async get(request,response,next){

        console.log(`■ Fetching tickets...`);

        await db.query(`SELECT * FROM ticket 
        INNER JOIN servicios ON
        ticket.servicio = servicios.idServicio
        `,(error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(result);

            console.log(`■ Tickets fetched!`);
            request.body.tickets = result;
            next();
        })
    }

    async delete(request,response,next){
        console.log(`Deleting ticket...`);

        const {idTicket} = request.body;
;
        await db.query(`DELETE FROM ticket WHERE idTicket = ?`,idTicket,(error,result,column)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(`Ticket deleted!`);

            return response.json({
                status:200,
                message:`Ticket eliminado`
            });
        });
    }

    async saveStatesTicket(request,response,next){
        
        const { equipmentState,ticketId } = request.body;

        await request.body.equipmentState.map(async(status)=>{
            await db.query(`INSERT INTO ticketestados values
            (?,?,?,?)
            `,[null,status.idEstadoTicketNombre,ticketId,status.estado],
            (error,result,columns)=>{
                if(error){
                    return response.json({
                        status:500,
                        error
                    });
                }
            })
        });

        return response.json({
            status:200,
            message:`Ticket creado`
        });
        
    }

    async find(request,response,next){

        console.log(`■ Looking for the ticket...`);

        await db.query(`SELECT * FROM ticket 
        WHERE idTicket = ?`,
        request.params.idTicket,
        (error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }

            if(result.length===0){
                return response.json({
                    status:404,
                    message:`No se encontro el ticket`
                });
            }

            console.log(`Ticket Founded!`);

            request.body.infoTicket = result;  
            next();
        })
    }

    async findState(request,response,next){
        await db.query(`SELECT * FROM ticketestados WHERE
        ticketCorresponde = ?`,request.params.idTicket,(error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }

            return response.json({
                status:200,
                ticketInfo:request.body.infoTicket,
                estatusEquipment:result
            });
        })
    }

    async update(request,response,next){
        console.log(`■ Updating ticket of client...`);

        console.log(request.body);
        
        await db.query(`UPDATE ticket SET
            diaRecoleccion = ?,
            mesRecoleccion = ?,
            recolectionYear = ?,
            diaEntrega = ?,
            mesEntrega = ?,
            entregaYear = ?,
            modelo = ?,
            marca = ?,
            descripcion = ?,
            servicio = ?,
            cotizacion = ?,
            medioPagoId = ?,
            totalPago = ?,
            estadoReparacion = ? WHERE idTicket = ?
        `,[
            request.body.recolectionDay,
            request.body.recolectionMonth,
            request.body.recolectionYear,
            request.body.deliveryDay,
            request.body.deliveryMonth,
            request.body.deliveryYear,
            request.body.model,
            request.body.fabricant,
            request.body.description,
            request.body.service,
            request.body.price,
            request.body.payMethod,
            request.body.total,
            request.body.repairState,
            request.body.ticketId
        ],(error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(`■ Updated correctly`);
            return response.json({
                status:200,
                message:`Ticket actualizado`
            });
        })
        return;
    }
}

const ModelTickets = new Tickets();
module.exports = ModelTickets;