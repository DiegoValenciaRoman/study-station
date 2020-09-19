import { Request, Response } from "express";

import Usuario from "../../models/usuario.model";
import { obtenerInformacion } from "../helpers/obtenerInformacion";
import { obtenerCursos } from "../helpers/obtenerCursos";

export const scrappInformacionUsuario = async (req: Request, res: Response) => {
  //todo, definir una interfaz para las respuestas
  let respuesta: any = await obtenerInformacion(req.body.rut, req.body.pass);
  return res.status(200).json({
    estado: respuesta.estado,
    mensaje: respuesta.mensaje,
    data: respuesta.data,
  });
};

export const scrappCursosUsuario = async (req: Request, res: Response) => {
  //todo, definir una interfaz para las respuestas
  let respuesta: any = await obtenerCursos(req.body.rut, req.body.pass);
  return res.status(200).json({
    estado: respuesta.estado,
    mensaje: respuesta.mensaje,
    data: respuesta.data,
  });
}


export const crearUsuario = (req: Request, res: Response) => {
  console.log("Ingresa al controlador");

  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      console.log(err);
      return res.status(200).json({
        estado: "ERROR",
        mensaje: "Error al almacenar el usuario en la bd",
        data: [],
      });
    }
    res.status(200).json({
      estado: "OK",
      mensaje: "Se creó el usuario correctamente",
      data: [],
    });
  });
};
