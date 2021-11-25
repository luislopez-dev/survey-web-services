# Servicios web de encuestas

## Tabla de contenidos

* [Introducción](#introducción)
* [Tecnologías](#tecnologías)
* [Instalación](#instalación)
* [Ejecución](#ejecución)
* [Endpoints](#endpoints)

## Introducción

Examen práctico - NODE JS

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

## Obtener JSON WEB TOKEN

![GET](https://img.shields.io/badge/METHOD-GET-brightgreen) **`http://localhost:8080/survey/token`**  

* Debido a que no se solicitó un sistema de Registro y Login en este proyecto, se ha creado un servicio web adicional para obtener un token de autenticación y poder acceder a los servicios web protegidos 
 
* Cada token tiene un periodo de duración de 24 horas

* Solamente se necesita acceder a la ruta `http://localhost:8080/survey/token` para generar y obtener un token

## Creación de encuestas

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`http://localhost:8080/survey`**

* Require autenticación por medio de JWT

Propiedades del Body:

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| name | Si | Texto | Nombre de la encuesta |
| description | Si  | Texto | Descripción de la encuesta |
| fields | Si | Array de objetos, cada campo debe ingresarse a través de un objeto. En la siguiente tabla se brindan los Propiedades que debe tener cada campo (field)  | Campos de la encuesta |

Propiedades de los campos (Fields):

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| name | Si | Texto | Nombre del campo |
| title | Si  | Texto | Título del campo |
| isRequired | Si | Booleano  | Indica si es obligatorio llenar el campo |
| type | Si | Texto | Tipo de campo (Texto, Número y Fecha)

## Modificación de encuestas

![PUT](https://img.shields.io/badge/METHOD-PUT-yellow) **`http://localhost:8080/survey`**

* Require autenticación por medio de JWT

Propiedades del Body:

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| name | Si | Texto | Nombre de la encuesta |
| description | Si  | Texto | Descripción de la encuesta |
| fields | Opcional | Array de objetos, cada campo debe ingresarse a través de un objeto. En la siguiente tabla se brindan las propiedades que debe tener cada campo (field)  | Campos de la encuesta |

Propiedades de los campos (Fields):

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| name | Si | Texto | Nombre del campo |
| title | Si  | Texto | Título del campo |
| isRequired | Si | Booleano  | Indica si es obligatorio llenar el campo |
| type | Si | Texto | Tipo de campo (Texto, Número y Fecha)

## Eliminación de encuestas

![DELETE](https://img.shields.io/badge/METHOD-DELETE-red) **`http://localhost:8080/survey/:id`**

* Require autenticación por medio de JWT

Parametros en la URL:

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| id | Si | Número | `Id` de la encuesta a eliminar |

## Llenar encuesta

![POST](https://img.shields.io/badge/METHOD-POST-blue) **`http://localhost:8080/survey/fill`**

* No require de autenticación

Propiedades del Body:

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| id | Si | Número | `Id` de la encuesta a llenar |
| fields | Si | Array de objetos, cada campo debe ingresarse a través de un objeto. En la siguiente tabla se brindan los paramentos que debe tener cada campo (field)  | Campos de la encuesta |

Elementos de los campos (Fields):

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| id | Si | Número |`Id` del campo a llenar |
| result | Si  | Texto | Respuesta ingresada en el campo |

## Obtener resultados de cada encuesta

![GET](https://img.shields.io/badge/METHOD-GET-brightgreen) **`http://localhost:8080/survey/results/:id`**  

* Require de autenticación por medio de JWT

Parametros en la URL:

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| id | Si | Número | `Id` de la encuesta a revisar |

## Obtener encuesta y sus campos

![GET](https://img.shields.io/badge/METHOD-GET-brightgreen) **`http://localhost:8080/survey/:id`**  

* No require de autenticación

* La URL de este servicio web es retornada automáticamente después de la creación de la encuesta

Parametros en la URL:

| Nombre | Requerido  | Tipo  | Descricpión |
| :---:| :-:| :-:| :-:|
| id | Si | Número | `Id` de la encuesta a revisar |
