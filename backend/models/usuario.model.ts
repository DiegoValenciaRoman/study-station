import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre:{
        type: String
    },
    apellido:{
        type: String
    }
});

export = mongoose.model('Usuario', usuarioSchema);

