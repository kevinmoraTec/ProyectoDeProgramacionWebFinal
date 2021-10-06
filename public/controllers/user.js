'use strict'
const { user } = require('../models/index')

async function createUser (req, h) {
  console.log(req.payload)
  try {
    const createUserId = await user.create(req.payload)
    return h.response(`Usuario registrado satisfactoriamente con el ID ${createUserId}`).code(201)
  } catch (error) {
    console.error(error)
    return h.response('Problemas al registrar el usuario').code(500)
  }
}

async function validateUser(req, h) {
  try {
    const userLogin = await user.validateUser(req.payload)
    if (!userLogin) {
      return h.response('Email y/o Contraseña incorrectas').code(401)
    }
    return h.redirect('/').state('user',{
      name: userLogin.name
    })
    //return userLogin
  } catch (error) {
    console.error(error)
    return h.response('Problemas al logear el usuario').code(500)
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