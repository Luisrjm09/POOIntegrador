const axios = require('axios');
const { URL_API } = require('../config');

class HelperServices{

    constructor(services){
        this.services = services;
    }

    async getServices(){
        try {
          const { data } = axios.get(`${URL_API}servicios`);
          this.services = data.services;
          
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HelperServices;