import Server from "./server";

const server = Server.init(3000);

server.start(()=>{
    console.log('Servidor online en puerto: 3000');
})