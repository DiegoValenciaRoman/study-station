/**
 * version 0.1
 * TODOS :
 * - ahora el backend si tira exepcion al obtener usuario o clave invalida , de timout tambien.
 * - verificar para caso de encuesta docente obligatoria
 */

const puppeteer = require("puppeteer");

interface userinfo {
  nombre: String;
  sexo: String;
  nacionalidad: String;
  nacimiento: String;
  correo: String;
  movil: String;
}
/**
 * @params
 * @param rut: String - el rut del usuario sin puntos y con guion al que se le va a realizar el scrapping
 * @param pass: String - el pass del usuario al que se le va a realizar el scrapping
 *
 * @description: funcion asincrona que recibe rut y pass de un alumno con acceso a intranet de la UTA y mediante un proceso de scrapping
 * captura la informacion personal del usuario(nombre,nacionalidad,etc)
 *
 * @returns retorna un objeto tipo {estado:String ,mensaje:String, data:any o userinfo}
 */
export async function obtenerInformacion(rut: String, pass: String) {
  // wrapper para catchear errores
  try {
    // crear instancia
    //TODO : Dejar el booleano como una variable de entorno que se sette false en desarrollo y true en produccion
    const browser = await puppeteer.launch({
      args: ["--disable-features=site-per-process"],
      headless: false,
    });

    // crear pagina en el browser
    const page = await browser.newPage();

    //registrar evento de dialogo
    page.on("dialog", async (dialog: any) => {
      await console.log(dialog.message());
      let mensaje: string = dialog.message();
      await dialog.dismiss();
    });

    // navigate to a website
    await page.goto("http://chitita.uta.cl/intranet/INT_control_acceso.php");

    //const frame = await elementHandle.contentFrame();
    //selecciona el boton para alumnos, ingresa rut y pass y clickea boton para logeaer
    await page.waitForSelector("#img_estudiante");
    await page.click("#img_estudiante");
    await page.type("#rut", rut, { delay: 100 });
    await page.type("#clave", pass, { delay: 100 });
    await page.click("#bot_aceptar");

    //segundo frame una vez logeado
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.waitForSelector("iframe");
    const elementHandle2 = await page.$('iframe[name="sitioFrametitulo"]');
    const frame2 = await elementHandle2.contentFrame();

    //recargar pag
    await page.goto("https://chitita.uta.cl/intranet/");
    await page.waitForSelector("iframe");
    //select frame
    const elementHandle3 = await page.$('iframe[name="sitioFrametitulo"]');

    //cerrar dialogo
    const frame3 = await elementHandle3.contentFrame();
    await frame3.waitForSelector(".ui-dialog-buttonset");
    await frame3.click(".ui-dialog-buttonset");
    await page.waitFor(2000);

    //click en mi informacion
    await frame3.waitForSelector(
      "#todo-el-menu > ul:nth-child(3) > li:nth-child(4) > a"
    );
    await frame3.click("#todo-el-menu > ul:nth-child(3) > li:nth-child(4) > a");

    //info usuario
    let usuario: userinfo = {
      nombre: "",
      sexo: "",
      nacionalidad: "",
      nacimiento: "",
      correo: "",
      movil: "",
    };
    //selectores css
    let selector_nombre: String =
      "#tab-datos-personales > table > tbody > tr:nth-child(2) > td:nth-child(4)";
    let selector_sexo: String =
      "#tab-datos-personales > table > tbody > tr:nth-child(3) > td:nth-child(2)";
    let selector_nacionalidad: String =
      "#tab-datos-personales > table > tbody > tr:nth-child(4) > td.valor";
    let selector_nacimiento: String =
      "#tab-datos-personales > table > tbody > tr:nth-child(3) > td:nth-child(4)";
    let selector_correo: String =
      "#tab-datos-personales > table > tbody > tr:nth-child(6) > td:nth-child(2)";
    let selector_movil: String =
      "#tab-datos-personales > table > tbody > tr:nth-child(7) > td:nth-child(2)";
    //esperar por la tabla
    await frame3.waitForSelector(selector_nombre);
    //seleccionar informacion
    usuario.nombre = await frame3.$eval(
      selector_nombre,
      (e: any) => e.innerHTML
    );
    usuario.sexo = await frame3.$eval(selector_sexo, (e: any) => e.innerHTML);
    usuario.nacionalidad = await frame3.$eval(
      selector_nacionalidad,
      (e: any) => e.innerHTML
    );
    usuario.nacimiento = await frame3.$eval(
      selector_nacimiento,
      (e: any) => e.innerHTML
    );
    usuario.correo = await frame3.$eval(
      selector_correo,
      (e: any) => e.innerHTML
    );
    usuario.movil = await frame3.$eval(selector_movil, (e: any) => e.innerHTML);
    await console.log(usuario);

    // cerrar navegador
    await browser.close();
    //retorna
    return {
      estado: "OK",
      mensaje: "Se obtuvo la informacion correctamente",
      data: usuario,
    };
  } catch (error) {
    // catch un error
    //mostrar en consola para propositos de debug
    console.log(error);
    //retorna
    return {
      estado: "ERROR",
      mensaje:
        "Ocurrio un error al intentar obtener la informacion del usuario",
      data: error,
    };
  }
}
