import { Router } from "express";

import * as usuariosCtrl from "../api/controllers/usuarios";

const router = Router();

router.get('/usuarios', usuariosCtrl.crearUsuario );

export default router;