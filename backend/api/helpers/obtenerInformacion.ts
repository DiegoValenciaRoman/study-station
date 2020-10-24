/**
 * version 0.2
 * TODOS :
 * - hacer mas consistente los valores, estados y condiciones de return
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
//variable global para manejar un evento especifico
//todo var
let mensaje: String = "";
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
  const browser = await puppeteer.launch({
    args: ["--disable-features=site-per-process"],
    headless: false,
  });
  try {
    // crear instancia
    //TODO : Dejar el booleano como una variable de entorno que se sette false en desarrollo y true en produccion

    // crear pagina en el browser
    const page = await browser.newPage();

    //registrar evento de dialogo
    page.on("dialog", async (dialog: any) => {
      mensaje = await dialog.message();
      await dialog.dismiss();
      await browser.close();
    });

    // navegar al website
    await page.goto("https://portal.uta.cl/intranet/login");

    //selecciona el boton para alumnos, ingresa rut y pass y clickea boton para logeaer
    //esperar por un input y luego ver si hay modal o no
    await page.waitForSelector("#mat-input-3");
    await page.waitFor(1500);
    await page.click(
      "#mat-dialog-0 > dialog-content-example-dialog > mat-dialog-actions > button > span"
    );
    //ingresar credenciales
    await page.type("#mat-input-3", rut, { delay: 20 });
    await page.type("#mat-input-4", pass, { delay: 20 });
    await page.click(
      "#login-form > div.pt-10.pr-8.pb-12.pl-8.ng-tns-c172-18 > div:nth-child(2) > form > div.form-group.ng-tns-c172-18 > button"
    );

    //esperar cargar despues de auth
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    //click en el dropdown del perfil
    let perfil_dropdown =
      "#container-3 > toolbar > mat-toolbar > div > div:nth-child(2) > button.mat-focus-indicator.mat-menu-trigger.user-button.ng-tns-c159-105.mat-button.mat-button-base > span > div > mat-icon";
    await page.waitForSelector(perfil_dropdown);
    await page.click(perfil_dropdown);
    //click en mi perfil
    await page.waitFor(500);
    await page.click("#mat-menu-panel-6 > div > button:nth-child(1)");

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
      "#datos-perfil > div > div > div:nth-child(2) > div > div:nth-child(2) > span.valor";
    let selector_sexo: String =
      "#datos-perfil > div > div > div:nth-child(2) > div > div:nth-child(5) > span.valor";
    let selector_nacionalidad: String =
      "#datos-perfil > div > div > div:nth-child(2) > div > div:nth-child(4) > span.valor";
    let selector_nacimiento: String =
      "#datos-perfil > div > div > div:nth-child(2) > div > div:nth-child(6) > span.valor";
    let selector_correo: String =
      "#datos-perfil > div > div > div:nth-child(2) > div > div:nth-child(3) > span.valor";
    let selector_movil: String =
      "#datos-perfil > div > div > div:nth-child(2) > div > div:nth-child(8) > span.valor";
    //esperar por la tabla
    await page.waitForSelector(selector_nombre);
    //seleccionar informacion
    usuario.nombre = await page.$eval(selector_nombre, (e: any) => e.innerHTML);
    usuario.sexo = await page.$eval(selector_sexo, (e: any) => e.innerHTML);
    usuario.nacionalidad = await page.$eval(
      selector_nacionalidad,
      (e: any) => e.innerHTML
    );
    usuario.nacimiento = await page.$eval(
      selector_nacimiento,
      (e: any) => e.innerHTML
    );
    usuario.correo = await page.$eval(selector_correo, (e: any) => e.innerHTML);
    usuario.movil = await page.$eval(selector_movil, (e: any) => e.innerHTML);
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
    console.log(error.message);
    await browser.close();
    //retorna
    if (
      error.message ===
      "Protocol error (Input.dispatchMouseEvent): Target closed."
    ) {
      return {
        estado: "ERROR",
        mensaje:
          "Ocurrio un error al intentar obtener la informacion del usuario",
        data: mensaje,
      };
    }
    return {
      estado: "ERROR",
      mensaje:
        "Ocurrio un error al intentar obtener la informacion del usuario",
      data: error.message,
    };
  }
}
