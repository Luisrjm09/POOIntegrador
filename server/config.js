const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ste'
});

connection.connect(e=>{
    if(e){
        console.log(`■ There was an error connecting to DB ${e}`);
        return
    }
    console.log(`■ Connected to db success`);
});

module.exports = connection;