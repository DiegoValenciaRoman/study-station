import { Router } from "express";

import * as usuariosCtrl from "../api/controllers/usuarios";

const router = Router();

router.post("/scrappInformacionUsuario", usuariosCtrl.scrappInformacionUsuario);
router.post("/usuarios", usuariosCtrl.crearUsuario);

export default router;
