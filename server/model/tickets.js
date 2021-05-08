const db = require('../config');

class Tickets{
    async add(request,response,next){
        //medioContacto,clientId,estado equipo
        console.log(`■ Trying to save ticket...`);

        const { firstName , ticketMiddlename , ticketLastname1 , 
            ticketLastname2 , ticketPhone, payMethod, service,
            model , description , price , total, repairState,
            recolectionDay , recolectionMonth , recolectionYear,
            deliveryDay , deliveryMonth, deliveryYear } = request.body;

            // console.log(request.body);

        await db.query(`INSERT INTO ticket values 
        (
            ?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,
            ?,?,?,?,
            ?,?,?
        )`,
        [
            null,recolectionDay,recolectionMonth,recolectionYear,
            deliveryDay,deliveryMonth,deliveryYear, model,
            description,service,price,1,
            payMethod,total,1,repairState,
            1, `${firstName} ${ticketMiddlename} ${ticketLastname1} ${ticketLastname2}`,ticketPhone
        ],(error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(`Ticket saved!`);
            return response.json({
                status:200,
                message:`Ticket creado`
            });
        });
    }
}

const ModelTickets = new Tickets();
module.exports = ModelTickets;