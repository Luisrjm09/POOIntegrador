const axios = require('axios');
const {URL_API,URL_CLIENT} = require('../config');
const { Alert } = require('../helpers/alerts');

localStorage.setItem('isLogged','0');

class Login{

    constructor(){
        this.userName = ``;
        this.password = ``;
    }

    getCredentials(){
        this.userName = document.getElementById('userName').value;
        this.password = document.getElementById('password').value;
    }

    async login(){
        const { data } = await axios.post(`${URL_API}usuarios/login`,{
            userName:this.userName,
            password:this.password
        });

        if(data.status===200){
            console.log(`Usuario logeado`);
            localStorage.setItem('isLogged','1');
            window.location.href = `${URL_CLIENT}tickets.html`;
            return;
        }

        Alert.queryError(data.message);
    }
}

const LoginUI = new Login();

document.getElementById('btnLogin').addEventListener('click',(e)=>{
    e.preventDefault();
    LoginUI.getCredentials();
    LoginUI.login();
});