# [Node.Js](https://nodejs.org/es)

**Node.JS** es un entorno de ejecución de javascript, esto permite ejecutar javascript en multitud de plataformas sin ser necesariamente un navegador. Es de código abierto, asíncrono, con entrada y salida de datos, su arquitectura esta orientada a eventos y ademas ejecuta [v8](https://es.wikipedia.org/wiki/V8_(intérprete_de_JavaScript)) (Es el motor de javascript que ejecuta Chrome).  

### ¿Que significa que su arquitectura este "Orientada a eventos"?
Esto básicamente significa que NodeJs maneja un bucle de eventos lo que permite manejar múltiples operaciones concurrentes sin bloquear el hilo principal de ejecución. El eje central de esta arquitectura es el **Bucle de eventos** (Event Loop), es responsable de gestionar las operaciones asíncronas y mantener la ejecución del programa en curso. El bucle de eventos permite a Node.js manejar múltiples tareas de manera eficiente al cambiar entre ellas en función de su estado de disponibilidad.

## Instalación  

Lo primero es descargarlo de la [pagina oficial de NodeJS](https://nodejs.org/es), al entrar te dará a elegir entre dos versiones de NodeJS: La version estable y la ultima version. Es mas recomendable descargar la version estable. La desventaja de esto es que solo tendrás una version de NodeJS y se complicara si trabajas en varios proyectos que utilizan versiones distintas de NodeJS. Una alternativa es usar un gestor de versiones de node, algunas opciones son [NVM](https://github.com/nvm-sh/nvm) y [FNM](https://github.com/Schniz/fnm) este ultimo esta construido con RUST por lo cual necesitaras tenerlo instalado para usarlo.


## "Hola Mundo!"
Lo primero sera crear la carpeta de nuestro proyecto ***node_example***.
~~~
$ mkdir node_example
$ cd node_example
~~~
Creamos un archivo ***index.js***.
~~~js
console.log("Hola Mundo!")
~~~
Ya con esto podemos usar **Node** para ejecutar nuestro fichero ***index.js***
~~~shell
$ node index.js
Hola Mundo!
~~~
Con el comando ***node [nombre_del_fichero]*** puedes ejecutar ficheros .js desde la terminal. Desde node tienes acceso a la api del navegador como en este caso usamos ***console.log***. Sin embargo no tenemos acceso a **windows** debido a que en node no existe. En node (y esto es igual en cualquier entorno) el objeto global es ***globalThis***.  
Siempre que se pueda, en cualquier entorno, es recomendable usar ***globalThis***.


## Módulos en NodeJS
Una de las soluciones que aporto NodeJS fue su sistema de módulos [***CommonJS***](https://en.wikipedia.org/wiki/CommonJS#:~:text=CommonJS%20is%20a%20project%20to,js.). Esto permite separar tu código en distintos ficheros, importar y exportar funciones, variables, etc. 
~~~js
// Exportar función
function suma(a,b){return a+b}
module.exports = suma   

// Importar una función desde otro fichero
const modulo = require("./modulo.js")
~~~
Esta es la forma clásica de exportar módulos de NodeJS y si aunque no esta deprecada no es muy recomendable usarla hoy en dia. La forma recomendable para importar y exportar módulos es utilizando ES Modules. Por defecto los archivos .js utilizan CommonJS asi que para utilizar ES Modules se debe usar un fichero con la extension ***.mjs***.
~~~mjs
// Exportar con ES Modules
function suma(a,b){return a+b}
export suma 

// Importar con ES Modules
import suma from "./suma.mjs"
~~~
Utilizando empaquetadores como [Webpack](https://webpack.js.org) o [Vite](https://vitejs.dev) no requiere que utilizes la extensions .mjs ya que usan una configuración para que los ficheros .js utilize ES Modules.

## Módulos nativos de NodeJS
NodeJS por defecto trae varios módulos nativos que te permiten realizar variedad de acciones tales como acceder a la información del sistema operativo, usar el sistema de ficheros, acceso a internet, etc.  

### [OS](https://nodejs.org/dist/latest-v18.x/docs/api/os.html#os)
Un ejemplo de estos Módulos nativos es "***os***".
~~~js
const os = require("node:os") // en la documentación se recomienda utilizar el prefijo "node:"
// Nombre del sistema operativo
console.log("Sistema operativo: ", os.platform())
// Version del sistema operativo
console.log("Version del sistema operativo: ", os.release())
// Arquitectura del sistema
console.log("Arquitectura del sistema: ", os.arch())

~~~
En este caso la consola devolvería lo siguiente
~~~
Sistema operativo:  win32
Version del sistema operativo:  10.0.19045
Arquitectura del sistema:  x64
~~~
### [FS](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html) (file system)
El modulo FS permite interactuar con el sistema de archivos, da acceso a crear, leer archivos, crear ficheros, etc.  
archivo.txt:
~~~txt
hola mundo
~~~
~~~js
const fs = require("node:fs")


const stats = fs.statSync("./archivo.txt") //le los stats de un archivo
console.log(
    stats.isFile(), // si es un fichero
    stats.isDirectory(), // si es un directorio
    stats.isSymbolicLink(), // si es un enlace simbólico
    stats.size // tamaño en bytes
)


~~~
Lo que devuelve en consola es:
~~~
true false false 16
~~~

para leer archivos se utiliza las funciones de ***readFileSync*** de fs:
~~~js
const fs = require("node:fs")
const archivo = fs.readFileSync("./archivo.txt",{encoding:"utf-8"})
console.log(archivo)
~~~
se le pasa la dirección del fichero como primer parámetro y como segundo parámetro un objeto de opciones, en este caso como readFileSync devuelve un buffer le pasamos el encoding:"utf-8" para que nos devuelva lo que necesitamos.

### [PATH](https://nodejs.org/dist/latest-v18.x/docs/api/path.html)

El modulo PATH da utilidades para trabajar con rutas de archivos y directorios.
~~~js
const path = require("node:path")

// devuelve la forma de separar rutas en el sistema operativo, en caso de windows es -> \
console.log(path.sep) 
// crear rutas a mano -> `content\folder\archivo.txt` es una mala practica, para eso en node se usa path.join
const ruta = path.join("content","folder","archivo.txt") //-->content\folder\archivo.txt

// nombre del fichero
const nombre = path.basename("content/folder/archivo.tx") //  --> archivo.txt

// da el nombre de la extension del archivo
const extName = path.extname("content/folder/archivo.tx") //--> .txt
~~~ 

### [HTTP](https://nodejs.org/dist/latest-v18.x/docs/api/http.html)

El modulo http nos permite hacer procesos y confecciones con el protocolo http para levantar un servidor http.  
importamos el modulo HTTP
~~~js
const http = require('node:http')
~~~
~~~js

// primero se crea el server, el callback que recibe se ejecuta cada vez que recibe una request
const server = http.createServer((_req, res) => {
  console.log('request received')
  res.end('hola mundo')
})
// después se pone al servidor a escuchar por un puerto en este caso el puerto 3000.
// el callback se ejecuta una vez que el servidor se levanta.
server.listen(3000, () => {
  console.log('escuchando')
})

~~~
#### Rutas
`http.createServer` recibe un callback el cual tiene 2 parámetros: request y response. La request tiene toda la información sobre la petición al servidor.
~~~js
function processRequest (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') { // req tiene información como la url de la petición, cabeceras, etc.
    res.statusCode = 200
    
    res.end('bienvenido a mi página web')
  }else if(req.url === "/about"){
    res.end("pagina de about")
  }else { // si la ruta no coincide con ninguna 
    res.statusCode = 404
    res.end("404")
  }
}


~~~



## Objeto global process
El objeto global process te proporciona información y control sobre el proceso actual de ejecución, tiene propiedades y métodos que te van a dar control sobre el entorno de ejecución de nodeJS.
~~~js
// devuelve los argumentos de la ejecución del proceso. ejem: node index.js parámetro1 parámetro2
console.log(process.argv) // resultado --> ["ruta de node en el sistema", "ruta del archivo ejecutado", "parámetro1", "parámetro2"]

//también podemos controlar cunado sale el proceso en caso de haber algún error
process.exit()


//también podemos escuchar eventos del proceso
process.on("exit",()=>{
    // aquí se ejecuta cuando pase el evento "exit"
})

//también verificas desde donde se esta ejecutando el fichero
console.log(process.cwd())
~~~







## Asincronía y promesas

## [NPM](https://www.npmjs.com)
NPM es un registro de paquetes de código abierto que cualquiera puede utilizar de manera gratuita y por otro lado también es una linea de comandos que se instala junto con NodeJS. Es vital diferenciar entre el CLI de NPM y el registro de paquetes ya que hay diferentes alternativas a NPM como [yarn](https://yarnpkg.com) o [pnpm](https://pnpm.io/es/) que utilizan el registro de paquetes de NPM.  

### Iniciar un proyecto
Para inicializar un proyecto se usa el comando ***`node init`*** y te dará varias opciones para configurar tu proyecto tales como: nombre del proyecto, licencias, fichero de entrada, etc. (si quieres puedes ejecutar ***`node init -y`***). Se creara un archivo `package.js` como el siguiente:
~~~json
{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

~~~
En este `package.json` se guardaran todas las dependencias de nuestro proyecto asi como las licencias, script para ejecutar el código (para levantar el proyecto, crear la version de producción, etc), nombre del proyecto, autor y demás. Este es uno de los archivos mas importantes al trabajar con NodeJS y NPM.
 