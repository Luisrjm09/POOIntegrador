const bcrypt = require('bcrypt');
 
class User{
    async encryptPass(request,response,next){
        await bcrypt.hash(request.body.password,10,(e,hash)=>{
            if(e){
                return e;
            }

            request.body.hashPass = hash;
            next();
        });
    }

    async validatePass(request,response,next){

        
        const { password, userInfo } = request.body;
        
        console.log(userInfo[0].password);

        bcrypt.compare(password,userInfo[0].password,(error,result)=>{
            if(error){
                return response.json({
                    status:500,
                    error
                });
            }

            if(result===true){
                return response.json({
                    status:200,
                    message:`Credenciales correctas`
                });
            }

            return response.json({
                status:403,
                message:`Usuario o credenciales incorrectas`
            })
        })
    }
}

const UserController = new User();

module.exports = UserController;