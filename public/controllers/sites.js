'use strict'

const questions = require('../models/index').questions

async function home (req, h) {
  let data
  try {
    data = await questions.getLast(10)
  } catch (error) {
    console.error(error)
  }
  return h.view('index', {
    title: 'home',
    user: req.state.user,
    questions: data
  })
}

function register (req, h) {
  if(req.state.user){
    return h.redirect('/')
  }else{
      return h.view('register', {
      title: 'Registro'
    })
  }

}
function login (req, h) {
  if(req.state.user){
    return h.redirect('/')
  }
  
  return h.view('login', {
    title: 'Ingrese',
    user: req.state.user  // El valor de esta variable de ruta se obteniene del estado actual de la aplicación (accede a la cookie user) para mostrar o no ciertos controles en la vista
  })
}
async function viewQuestion (req, h) {
  let data
  try {
    data = await questions.getOne(req.params.id)
    return h.view('questions', {
      title: 'Detalles de la pregunta',
      user: req.state.user,
      question: data,
      key: req.params.id
    })   
  } catch (error) {
    console.error(error)
  }

}

function ask (req,h){
  if(!req.state.user){
    return h.redirect('/login')
  }
  return h.view('ask',{
    title:'Crear Pregunta',
    user:  req.state.user
  })
   

}

module.exports = {
  ask:ask,
  home: home,
  login:login,
  register: register,
  viewQuestion:viewQuestion
}