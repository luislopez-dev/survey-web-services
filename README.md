# Servicios web de encuestas

## Tabla de contenidos

* [Introducción](#introducción)
* [Tecnologías](#tecnologías)
* [Instalación](#instalación)
* [Ejecución](#ejecución)
* [Endpoints](#endpoints)

## Introducción

Examen práctico de Devel Systems, S.A.

## Tecnologías

* Node.js
* Express
* SQL Server
* Sequelize
* JWT
* NPM

## Instalación

1. Descargue o clone este repositorio

2. Diríjase a la carpeta raíz del proyecto

3. Instale las dependencias a través del siguiente comando: `npm install`

## Ejecución

Por razones de seguridad, algunas variables se han ocultado a la vista y se han utilizado como variables de entorno con la ayuda del paquete dotenv. A continuación se muestran las variables que debe configurar para ejecutar la aplicación:

* `HOST=` El servidor de la base de datos, por ejemplo: "localhost"

* `DATABASE_USER=` El nombre de usuario de la base de datos

* `DATABASE_PASS=` La contraseña de la base de datos

* `DATABASE_NAME=` El nombre de la base de datos

* `SECRET_KEY=` La llave secreta para la autenticación por medio de JWT, en procesos de pruebas se puede usar una simple cadena de texto, como por ejemplo "mi-llave". En caso de que se ignore esta variable, se utilizara el valor por defecto "random-string" 

* `PORT=` El puerto sobre el cual correrá la aplicación. En caso de que se ignore esta variable, se utilizara el puerto 8080 por defecto

Para iniciar la aplicación en entornos de pruebas ejecute el siguiente comando: 
`npm run dev`, para entornos de producción ejecute: `npm start`

## Endpoints

### Creación de encuestas

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`/survey`**

Parametros del Body:

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| name | Si | Texto | Nombre de la encuesta |
| description | Si  | Texto | Descripción de la encuesta |
| fields | Si | Array de objetos, cada campo debe ingresarse a través de un objeto. En la siguiente tabla se brindan los paramentos que debe tener cada campo (field)  | Campos de la encuesta |

Parametros de los campos (Fields):

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| name | Si | Texto | Nombre del campo |
| title | Si  | Texto | Título del campo |
| isRequired | Si | Booleano  | Indica si es obligatorio llenar el campo |
| type | Si | Texto | | Tipo de campo (Texto, Número y Fecha)
