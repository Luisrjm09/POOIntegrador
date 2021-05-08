const axios = require('axios');
const { URL_API } = require('../config');

class HelperServices{

    constructor(services){
        this.services = services;
        this.clients = [];
    }

    async getServices(){
        try {
          const { data } = axios.get(`${URL_API}servicios`);
          this.services = data.services;
          
        } catch (error) {
            console.log(error);
        }
    }

    async getClients(){
        try {
            const { data } = await axios.get(`${URL_API}clientes`);
            this.clients = data.data;
            return this.clients;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HelperServices;