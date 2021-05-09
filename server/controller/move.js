const DateServer = require('../middlewares/date');
const { monthName } = require('../helpers/date');
const ControllerClients = require('./clients');

class Moves{
    parseMoves(request,response,next){
        request.body.moves.map((move,i)=>{
            request.body.moves[i] = {
                ...request.body.moves[i],
                dateCreated:`${request.body.moves[i].diaMovimiento}-${monthName[request.body.moves[i].mesMovimiento]}-${request.body.moves[i].yearMovimiento}`,
                typeMove:`${ request.body.moves[i].tipo === 1 ? 'Egreso' : 'Ingreso'}`
            }
        });

        return response.json({
            status:200,
            moves:request.body.moves
        });
    }
}

const ControllerMoves = new Moves();
module.exports = ControllerMoves;