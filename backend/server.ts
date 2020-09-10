import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import routes from './routes/index-routes';

export default class Server{

  private app: express.Application;
  private port: number;

  constructor(port: number){
    this.app = express();
    this.port = port;

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use('/api', routes );
    
  }

  static init(port: number){
    return new Server(port);
  }

  start(callback: ()=>void){
    this.app.listen(this.port, callback);
  }

}