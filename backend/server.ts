import express = require('express');
import routes from './routes/index-routes';


export default class Server{

  public app: express.Application;
  public port: number;

  constructor(port: number){
    this.app = express();
    this.port = port;

    this.app.use('/api', routes );

  }

  static init(port: number){
    return new Server(port);
  }

  start(callback: ()=>void){
    this.app.listen(this.port, callback);
  }

}