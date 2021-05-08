const DateServer = require('../middlewares/date');

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
}

const ControllerTickets = new Tickets();
module.exports = ControllerTickets;