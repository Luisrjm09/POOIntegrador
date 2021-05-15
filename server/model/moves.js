const db = require('../config');
const DateServer = require('../middlewares/date');
const ControllerMoves = require('../controller/move');

class Moves {

    constructor(){
        this.idCashRegister = 0;
    }

    async add(request, response, next) {
        console.log(`■ Trying to save move...`);

        console.log(request.body);

        const { total, typeMove, date, concept } = request.body;
        const [year, month, day] = DateServer.splitDate(date);

        await db.query(`INSERT INTO movimientos values
        (?,?,?,?,?,?,?,?)`,
            [null, concept, typeMove, total, 0, day, month, year],
            (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.json({
                        status: 500,
                        error: error.sqlMessage
                    });
                }

                console.log(`■ Move added!`);

                return response.json({
                    status: 200,
                    message: `Movimiento agregado`
                });
            })
    }

    async get(request, response, next) {
        console.log(`■ Fetching moves...`);

        await db.query(`SELECT * FROM movimientos`, (error, result, columns) => {
            if (error) {
                console.log(error);
                return response.json({
                    status: 500,
                    error
                });
            }

            request.body.moves = result;
            console.log(`■ Moves fetched`);

            next();
        });
    }

    async getMovesDay(request, response, next) {

        console.log(`■ Fetching moves...`);

        await db.query(`SELECT * FROM movimientos WHERE
        diaMovimiento = ? and
        mesMovimiento = ? and
        yearMovimiento = ? `,
            [
                request.params.day,
                request.params.month,
                request.params.year
            ], (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.json({
                        status: 500,
                        error: error.sqlMessage
                    });
                }

                request.body.moves = result;

                console.log(`■ Moves fetched`);

                return response.json({
                    status: 200,
                    moves: result,
                    cashRegisterDay:request.body.cashRegister
                });
            })
    }

    async updateNewCashRegister(request,response,next){

        if(request.body.createCashRegister===true){

            console.log(`■ Inserting new cash register of the day...`);

            await db.query(`INSERT INTO dinero values (?,?,?,?,?,?)`,
            [null,request.body.updatedCashRegister,0,request.params.day,request.params.month,request.params.year],
            (error,result,response)=>{
                if(error){
                    console.log(error);
                    return response.json({
                        status:500,
                        error
                    });
                }

                console.log(result);

                request.body.cashRegister = result;
                next();

            })
        }else{
            next();
        }
    }

    async getCashRegister(request, response, next) {

        request.body.createCashRegister = false;
        console.log(`■ Getting last cash register...`);

        await db.query(`SELECT * FROM dinero WHERE 
        dia = ? and
        mes = ? and
        yearTime = ?`,
            [
                request.params.day,
                request.params.month,
                request.params.year
            ], (error, result, columns) => {
                if (error) {
                    console.log(error);
                    return response.json({
                        status: 500,
                        error: error.sqlMessage
                    })
                }

                // CASH DOESN'T EXIST, CREATE DATA
                if (result.length === 0) {
                    request.body.createCashRegister = true;
                }

                // ALL OK, CONTINUE
                request.body.cashRegister = result;
                console.log(result);                

                next();
            });


    }

    async getLastCashRegister(request, response, next) {
        if (request.body.createCashRegister === true) {
            console.log(`■ Getting last cash register to update...`);

            await db.query(`SELECT * from dinero ORDER BY idEstadoCaja DESC LIMIT 1`,
                (error, result, response) => {
                    if (error) {
                        console.log(error);
                        return response.json({
                            status: 500,
                            error: error.sqlMessage
                        });
                    }
                    request.body.lastCashRegisterUpdate = result[0];
                    next();
                });
        }else{
            next();
        }

    }

    async getMovesCashRegister(request, response, next) {

        if (request.body.createCashRegister === true) {
            console.log('--- Getting moves of the last cash register...');

            await db.query(`SELECT precio,tipo FROM movimientos WHERE idCorte = ?`,
                request.body.lastCashRegisterUpdate.idEstadoCaja, (error, result, columns) => {
                    if (error) {
                        return response.json({
                            status: 500,
                            error
                        });
                    }
                    request.body.movesCalculation = result;
                    next();
                });
        }else{
            next();
        }
    }

    async saveUpdatedCashRegister(request,response,next){

        console.log(`--- Updating new cash register of the day...`);

        await db.query('UPDATE dinero SET montoFinal WHERE idEstadoCaja = ?',
        request.body.lastCashRegisterUpdate.idEstadoCaja,(error,result,columns)=>{
            if(error){
                return response.json({
                    status:200,
                    error
                });
            }

            next();
        })
    }

    async movesMonth(request,response,next){
        console.log(`■ Getting moves of the month...`);

        await db.query(`SELECT * FROM movimientos WHERE mesMovimiento = ? AND yearMovimiento = ?`,
        [request.params.month,request.params.year],(error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }

            console.log(`■ Moves of the month fetched!`);
            return response.json({
                status:200,
                moves:result
            });
        })
    }
}

const ModelMoves = new Moves();
module.exports = ModelMoves;