const axios = require('axios');
const { URL_API } = require('../config');
const { getActualDate } = require('../helpers/date');
const { Alert } = require('../helpers/alerts');

class Manage{

    constructor(){
        this.moves = [];
        this.cashRegister = 0;
        this.income = 0;
        this.expenses = 0;
    }

    async getMoves(){
        try {
            const today = getActualDate();
            console.log(today);

            const { data } = await axios.get(`${URL_API}movimientos/${today.numberDate.day}/${(today.numberDate.month)+1}/${today.numberDate.year}`);

            this.cashRegister = data.cashRegisterDay[0].montoInicial;

            if(data.status===200){
                this.moves = data.moves;
                return;
            }

            Alert.queryError(data.error);

        } catch (error) {
            console.log(error);
        }
    }

    calculateMoney(){

        let income = 0;
        let expenses = 0;

        this.moves.map(move=>{
            { move.tipo === 0 ? income+=move.precio : expenses+=move.precio }
        });

        this.income = income;
        this.expenses = expenses

        return [income,expenses,this.cashRegister];
    }

    printManage(money,id){
        document.getElementById(id).value = money;
    }

    calculateCashRegister(){

    }
}

const ManageUI = new Manage();

module.exports = ManageUI;