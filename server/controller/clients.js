class Clients{
    generateFullName(request,response,next){

        let clients = request.params.clients;

        console.log(clients);

        clients.map((client,i)=>{
            clients[i] = {
                ...clients[i],
                fullName:`${clients[i].primerNombre} ${clients[i].segundoNombre} ${clients[i].apellidoPaterno} ${clients[i].apellidoMaterno}`
            }
        });

        return response.json({
            status:200,
            data:clients
        });
    }
}

const ControllerClients = new Clients();

module.exports = ControllerClients;