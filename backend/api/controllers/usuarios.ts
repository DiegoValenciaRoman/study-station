import {Request, Response} from 'express';

export const crearUsuario = (req: Request, res: Response)=>{

    console.log('Ingresa al controlador');
    
    res.status(200).json({
        estado: 'ok',
        mensaje: 'Usuario creado con éxito'
    });

}