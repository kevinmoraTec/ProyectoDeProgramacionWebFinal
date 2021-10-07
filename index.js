'use strict'

const Hapi = require('hapi')
const handlerbars = require('./lib/helpers')
const inert = require('inert')
const methods=require('./lib/methods')
const path = require('path')
const vision = require('vision')
const routes=require('./routes')


const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, '/public')
    }
  }
})

async function init () {
  try {
    await server.register(inert)
    await server.register(vision)
    server.method('setAnswerRight', methods.setAnswerRight)


// Configurar el servidor para el envio de cookies (nombreCookie, opciones)
    // https://hapi.dev/tutorials/cookies/?lang=en_US
    // tiempo de vida de la cookie (en milisegundos)
    // localhost no es seguro
    // codificación de la cookie
    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7,
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json',
    })

    server.views({
      engines: {
        hbs: handlerbars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.route(routes)

    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception', err);
  process.exit(1);
});

init()
