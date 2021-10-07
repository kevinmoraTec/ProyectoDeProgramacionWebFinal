'use strict'
const firebase = require('firebase-admin')
const serviceAccount = require('../confing/overflowloja-firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://overflowloja-91796-default-rtdb.firebaseio.com/"
  })

  // Crear una instancia (referencia) de la base de datos
const db = firebase.database()

// Importar modulos (CLASES) correspondientes a los modelos de la base de datos
const User = require('./users')
const  Questions=require('./question')

// Recordar que los modelos esperan como parámetro una referencia hacia la base de datos.
// Exportamos las instancias de los modelos listas para ser invocadas en los controladores correspondientes
module.exports = {
  user: new User(db),
  questions: new Questions(db)
}