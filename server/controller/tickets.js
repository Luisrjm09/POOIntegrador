const DateServer = require('../middlewares/date');
const { monthName } = require('../helpers/date');

class Tickets{
    
    parseRecolectionDate(request,response,next){
        const { receptionDate } = request.body;

        const [year,month,day] = DateServer.splitDate(receptionDate);
        
        request.body.recolectionYear = year;
        request.body.recolectionMonth = month;
        request.body.recolectionDay = day;

        next();
    }

    parseDeliveryDate(request,response,next){
        const { deliveryDate } = request.body;

        const [year,month,day] = DateServer.splitDate(deliveryDate);
        
        request.body.deliveryYear = year;
        request.body.deliveryMonth = month;
        request.body.deliveryDay = day;

        next();
    }

    joinDates(request,response,next){
        request.body.tickets.map((ticket,i)=>{
            request.body.tickets[i] = {
                ...request.body.tickets[i],
                receptionDate:`${request.body.tickets[i].diaRecoleccion}-${monthName[request.body.tickets[i].mesRecoleccion]}-${request.body.tickets[i].recolectionYear}`,
                deliveryDate:`${request.body.tickets[i].diaEntrega}-${monthName[request.body.tickets[i].mesEntrega]}-${request.body.tickets[i].entregaYear}`
            }
        });

        next();
    }

    joinPayMethod(request,response,next){
        
        request.body.tickets.map((ticket,i)=>{
            request.body.tickets[i] = {
                ...request.body.tickets[i],
                payMethod: `${request.body.tickets[i].edioPagoId === 1 ? 'Efectivo' : 'Tarjeta'}`,
                descriptionStatus: `${ request.body.tickets[i].estadoReparacion === 1 ? 'No reparado' : 'Reparado' }`
            }
        });

        return response.json({
            status:200,
            tickets:request.body.tickets
        });
    }
}

const ControllerTickets = new Tickets();
module.exports = ControllerTickets;