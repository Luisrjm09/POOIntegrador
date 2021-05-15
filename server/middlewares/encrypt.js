const bcrypt = require('bcrypt');
const { request } = require('express');

class Crypt{

    async hash(text){
        await bcrypt.hash(text,this.saltRounds,(e,hash)=>{
            if(e){
                return e;
            }

            request.body.hashPass = hash;
            console.log(hash);
        });
    }
}

const HashInfo = new Crypt();

module.exports = HashInfo;