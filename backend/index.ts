import Server from "./server";
// Using ES6 imports
import mongoose from 'mongoose';

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

const server = Server.init(3000);

mongoose.connect('mongodb://localhost:27017/study-station', dbOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Base de datos online!');
});

server.start(()=>{
    console.log('Servidor online en puerto: 3000!');
})