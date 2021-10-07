'use strict'
const { user } = require('../models/index')

async function createUser (req, h) {
  console.log(req.payload)
  try {
    const createUserId = await user.create(req.payload)
    return h.view('register',{
      title: 'Registro',
      succes: `Usuario registrado satisfactoriamente con el ID ${createUserId}`
    })
  } catch (error) {
    console.error(error)
    return h.view('register',{
      title: 'Registro',
      error: 'Error Creando el Usuario'
    })
  }

}

async function validateUser(req, h) {
  try {
    const userLogin = await user.validateUser(req.payload)
    if (!userLogin) {
      return h.view('login',{
        title: 'login',
        error: 'Email y/o Contraseña incorrectas'
      })
    }
    return h.redirect('/').state('user',{
      name: userLogin.name
    })
    //return userLogin
  } catch (error) {
    console.error(error)
    return h.view('login',{
      title: 'login',
      error: 'Problemas al logear el usuario'
    })
  }
  
}

function logout(req,h){
  return h.redirect('/login').unstate('user');
}

module.exports = {
  createUser: createUser,
  logout: logout,
  validateUser:validateUser

}