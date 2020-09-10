// import dotenv from "dotenv";

// dotenv.config();

const SERVER_PORT:number = Number(process.env.SERVER_PORT) || 5000;    
const URI_DB:string = process.env.URI_DB || 'mongodb://localhost:27017/study-station'; 

export default {
    server: {
        port: SERVER_PORT
    },
    db:{
        uri_db: URI_DB
    }
}