const express = require('express');
const db = require('../config');
const DateServer = require('../middlewares/date');

class Moves{
    async add(request,response,next){
        console.log(`■ Trying to save move...`);

        console.log(request.body);

        const { total,typeMove,date,concept } = request.body;
        const [year,month,day] = DateServer.splitDate(date);

        await db.query(`INSERT INTO movimientos values
        (?,?,?,?,?,?,?,?)`,
        [null,concept,typeMove,total,0,day,month,year],
        (error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error:error.sqlMessage
                });
            }

            console.log(`■ Move added!`);

            return response.json({
                status:200,
                message:`Movimiento agregado`
            });
        })
    }

    async get(request,response,next){
        console.log(`■ Fetching moves...`);

        await db.query(`SELECT * FROM movimientos`,(error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }

            request.body.moves = result;
            console.log(`■ Moves fetched`);

            next();
        });
    }
}

const ModelMoves = new Moves();
module.exports = ModelMoves;