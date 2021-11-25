# Servicios web de encuestas

## Tabla de contenidos

* [Introducción](#introducción)
* [Tecnologías](#tecnologias)
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

3. Instale las dependencias: `npm install`

## Ejecución

Por razones de seguridad, algunas variables se han ocultado a la vista y se han utilizado como variables de entorno con la ayuda del paquete dotenv. A continuación se muestran las variables que debe configurar para ejecutar la aplicación:

* HOST= El servidor de la base de datos, por ejemplo: "localhost"

* DATABASE_USER= El nombre de usuario de la base de datos

* DATABASE_PASS= La contraseña de la base de datos

* DATABASE_NAME= El nombre de la base de datos

* SECRET_KEY= La llave secreta para la autenticación por medio de JWT, en procesos de pruebas puede usarse una simple cadena de texto, como por ejemplo "mi-llave". En caso de que se ignore esta variable, se utilizara el valor por defecto "random-string" 

* PORT= El puerto en el que correra la aplicacion. En caso de que se ignore esta variable, se utilizara el puerto 8080 por defecto

Para iniciar la aplicación debe ejecutar el siguiente comando:: `npm start`


