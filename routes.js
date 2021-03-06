'use strict'

const site = require('./public/controllers/sites')
const user = require('./public/controllers/user')
const Joi = require('@hapi/joi')
const {body,validationResult}=require('express-validator')
const questions=require('./public/controllers/question')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: site.home
  },
  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  {
    method: 'POST',
    // options: {
    //   validate: {
    //     payload: Joi.object({
    //       name: Joi.string().required().min(3),
    //       email: Joi.string().email().required(),
    //       password: Joi.string().required().min(6)
    //     })
    //   }
    // },
    path: '/create-user',
    handler: user.createUser,
  },

  {
    method: 'GET',
    path: '/login',
    handler: site.login

  },
  {
    method: 'GET',
    path: '/question/{id}',
    handler: site.viewQuestion
  },
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'GET',
    path: '/ask',
    handler: site.ask
  },

  {
    method: 'POST',

    // options: {
    //   validate: {
    //     payload: Joi.object({
    //       email: Joi.string().email().required(),
    //       password: Joi.string().required().min(6)
    //     })
    //   }
    // },
    path: '/validate-user',
    handler: user.validateUser,
  },
  ///>>///
  {
    method: 'POST',

    // options: {
    //   validate: {
    //     payload: Joi.object({
    //       email: Joi.string().email().required(),
    //       password: Joi.string().required().min(6)
    //     })
    //   }
    // },
    path: '/create-question',
    handler: questions.createQuestion,
  },
  {
    path: '/answer-question',
    method: 'POST',
    // options: {
    //   validate: {
    //     payload: {
    //       answer: Joi.string().required(),
    //       id: Joi.string().required()
    //     },
    //     failAction: user.failValidation
    //   }
    // },
    handler: questions.answerQuestion
  },
  {
    method: 'GET',
    path: '/answer/{questionId}/{answerId}',
    handler: questions.setAnswerRight
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  }

]