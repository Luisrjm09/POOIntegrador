const axios = require('axios');
const { URL_API } = require('../config');
const { Alert } = require('../helpers/alerts');
const UI = require('../helpers/UI');

class Moves{
    constructor(){
        this.moves = [];
        this.selectedMove = [];
    }

    async add(e){
        e.preventDefault();
        try {
            const total = document.getElementById('quantity').value;
            const typeMove = document.getElementById('typeMove').value;
            const date = document.getElementById('date').value;
            const concept = document.getElementById('concept').value;

            console.log(total);
            
            const { data } = await axios.post(`${URL_API}movimientos`,{
                total,
                typeMove,
                date,
                concept
            });

            if(data.status===200){
                Alert.querySuccess(data.message);
                return;
            }

            Alert.queryError(data.error);

        } catch (error) {
            console.log(error);
        }
    }

    async load(){
        try {
            const { data } = await axios.get(`${URL_API}movimientos`);

            if(data.status===200){
                this.moves = data.moves;
                console.log(this.moves);
                return;
            }

            console.log(data.error);

        } catch (error) {
            
        }
    }

    printMoves(){
        const Rows = new UI.Table(this.moves);
        Rows.createRow('bodyServices',['idMovimiento','precio','nombre','typeMove','dateCreated'],'idMovimiento');
        // Rows.addActions('bodyServices',['fas fa-trash-alt','fas fa-pen'],['deleteService','editService']);
    }
}

const MovesUI = new Moves();

module.exports = MovesUI;