import Server from "./server";
import Database from "./db";
import config from "./config/config";

const server = Server.init(config.server.port);
const db = Database.init(config.db.uri_db);

db.start((err:any)=>{
  if (err) {
    console.log(err.message);
  }else{
    console.log(`Base de datos online, URI: ${config.db.uri_db}`);
  }
})

server.start(()=>{
    console.log(`Servidor online en puerto: ${config.server.port}`);
});