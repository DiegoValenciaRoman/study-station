import {Request, Response} from 'express';

import Usuario from "../../models/usuario.model";

export const crearUsuario = (req: Request, res: Response)=>{
    console.log('Ingresa al controlador');
    
    let body = req.body;
    
    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido
    })
    
    usuario.save((err, usuarioDB)=>{
        if (err) {
            console.log(err);
            return res.status(200).json({
                estado: 'ERROR',
                mensaje: 'Error al almacenar el usuario en la bd'
            });
        }
        res.status(200).json({
            estado: 'OK',
            mensaje: 'Se creó el usuario correctamente'
        }) 
    });
    

}