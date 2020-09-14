import mongoose from 'mongoose';

export default class Database{

    private uri_db: string;
    private options: object;

    constructor(uri_db: string){
        this.uri_db = uri_db;
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
    }
  
    static init(uri_db: string){
      return new Database(uri_db);
    }
  
    start(callback:any){
        mongoose.connect(this.uri_db, this.options, callback);
    }
  
  }