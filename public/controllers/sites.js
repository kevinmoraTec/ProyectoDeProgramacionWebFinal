'use strict'

function home (req, h) {
  return h.view('index', {
    title: 'home',
    user: req.state.user 
  })
}

function register (req, h) {
  return h.view('register', {
    title: 'Registro'
  })
}
function login (req, h) {
  return h.view('login', {
    title: 'Ingrese',
    user: req.state.user  // El valor de esta variable de ruta se obteniene del estado actual de la aplicación (accede a la cookie user) para mostrar o no ciertos controles en la vista
  })
}

module.exports = {
  home: home,
  login:login,
  register: register
}