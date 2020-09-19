import { Frame } from "puppeteer";

const puppeteer = require("puppeteer");

interface cursoInfo {
  nombre: string,
  codigo: string,
  nombre_docente: string
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
 * captura los cursos incritos en el semestre activo del usuario(nombre,código,nombre del docente) y el semestre activo.
 *
 * @returns retorna un objeto tipo {estado:String ,mensaje:String, data:any o { semestre_activo:string, cursos[]: cursoInfo[]  }
 */
export async function obtenerCursos(rut: String, pass: String) {
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
        mensaje = await dialog.message();
        await dialog.dismiss();
        await browser.close();
      });
  
      // navegar al website
      await page.goto("http://chitita.uta.cl/intranet/INT_control_acceso.php");
  
      //const frame = await elementHandle.contentFrame();
      //selecciona el boton para alumnos, ingresa rut y pass y clickea boton para logeaer
      await page.waitForSelector("#img_estudiante");
      await page.click("#img_estudiante");
      await page.type("#rut", rut, { delay: 10 });
      await page.type("#clave", pass, { delay: 10 });
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
      const frame3: Frame  = await elementHandle3.contentFrame();
      await frame3.waitForSelector(".ui-dialog-buttonset");
      await frame3.click(".ui-dialog-buttonset");
      await page.waitFor(2000);
    
  
      // OBTENER INFO DEL CURSO 
      await frame3.click('#todo-el-menu > div:nth-child(7) > div:nth-child(1)');
      await frame3.waitForSelector('#todo-el-menu > div:nth-child(7) > div:nth-child(1) > div', { visible: true});
  

      //TODO: Iterar todos los cursos inscritos en el semestre actual por el alumno.
      
      // Selecciona un curso y abre la sección mensajes para obtener la info del curso. Omite la sección de horarios, los cursos van desde el selector 2 en adelante
      await frame3.click('#todo-el-menu > div:nth-child(7) > div:nth-child(1) > div > ul > div:nth-child(2)');
      await frame3.waitForSelector('#todo-el-menu > div:nth-child(7) > div:nth-child(1) > div > ul > div:nth-child(2) > div');
      await frame3.click('#todo-el-menu > div:nth-child(7) > div:nth-child(1) > div > ul > div:nth-child(2) > div > ul > li:nth-child(4) > a');  
      
      let selector_gral_curso: string = "#barraNavegacionPeriodo";
  
      await frame3.waitForSelector(selector_gral_curso);
  
      // [ año-semestreActivo , código-nombreCurso, 'Mensajes' ]  'Mensajes' es la sección actual del frame para obtejer la información
      let gral_curso = await frame3.$eval(selector_gral_curso, (e:any)=> e.innerHTML.split('/'))
      
      let nombreArray: string[] = [];
      // Iteración hasta 3, dado que el nombre se compone de 3 selectores estáticos (nombres, apellido pat, apellido mat)
      for (let index = 1; index <=3 ; index++) {
        nombreArray.push( await frame3.$eval(`#foto0 > div > p:nth-child(${index})`, (e:any)=> e.innerHTML ) );
      }
      
      let semestre_activo: string = gral_curso[0].slice(0,-1);
      let curso: cursoInfo = {
        codigo: gral_curso[1].split('-')[0].slice(1),
        nombre: gral_curso[1].split('-')[1].slice(0,-1),
        nombre_docente: nombreArray.join(' ')
      }
  
      // cerrar navegador
      await browser.close();
      //retorna
      return {
        estado: "OK",
        mensaje: "Se obtuvo la informacion correctamente",
        data: { semestre_activo, curso }
      };
    } catch (error) {
      // catch un error
      //mostrar en consola para propositos de debug
      console.log(error.message);
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
  