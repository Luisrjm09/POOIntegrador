const axios = require('axios');
const { URL_API } = require('../config');
const { getActualDate,months } = require('../helpers/date');
const { Alert } = require('../helpers/alerts');
const { formatMoney } = require('../helpers/numbers');

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Manage{

    constructor(){
        this.moves = [];
        this.incomePdfFormat = [['Fecha movimiento','Concepto','Costo del movimiento']];
        this.expensePdfFormat  = [['Fecha movimiento','Concepto','Costo del movimiento']];
        this.cashRegister = 0;
        this.income = 0;
        this.expenses = 0;
        this.movesMonth = [];
    }

    async getMoves(){
        try {
            const today = getActualDate();
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

        return [income,expenses,this.cashRegister,this.moves];
    }

    printManage(money,id){
        document.getElementById(id).value = money;
    }

    async getMovesMonth(){
        try {

            const today = getActualDate();


            const { data } = await axios.get(`${URL_API}movimientos/mensual/${(today.numberDate.month)+1}/${today.numberDate.year}`);

            if(data.status!==200){
                Alert.queryError(data.error);
                return;
            }

            console.log(data.moves);
            this.movesMonth = data.moves;

        } catch (error) {
            console.log(error);
        }
    }

    generateReportPDF(){       
        let docDefinition = {
            content: [
                {
                    text:'Ingresos',
                    style:'header'
                },
                {
                    table:{
                        body:this.incomePdfFormat
                    }
                },
                {
                    text:'Egresos',
                    style:'header'
                },
                {
                    table:{
                        body:this.expensePdfFormat
                    }
                }

            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        };

        pdfMake.createPdf(docDefinition).download();

    }

    prepareDataPDF(){
        console.log(`Preparing data for the pdf...`);

        this.movesMonth.map(move=>{
            let rowArray = [];

            rowArray.push(`${move.diaMovimiento}-${months[move.mesMovimiento]}-${move.yearMovimiento}`);
            rowArray.push(move.nombre);
            rowArray.push(formatMoney.format(move.precio));
            
            // 0 = Income
            // 1 = Expense

            {move.tipo===0 ? this.incomePdfFormat.push(rowArray) : this.expensePdfFormat.push(rowArray)}

        });
    }
}

const ManageUI = new Manage();

module.exports = ManageUI;