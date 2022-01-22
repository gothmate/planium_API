const express = require('express')
const routes = express.Router()
const fs = require('fs')

const dataPlans = require('../db/plans.json')
const dataPrices = require('../db/prices.json')
var databaseBeneficiario = require('../beneficiarios.json')
const { request } = require('http')
const { exceptionVidas } = require('../services/exceptions')
var verificaPlano = require('../services/plans')

//Busca dados
routes.get('/plans', (req, res) => {
  return res.json(dataPlans)
})

routes.get('/prices', (req, res) => {
  return res.json(dataPrices)
})

routes.get('/beneficiarios', (req, res) => {
  return res.json(databaseBeneficiario)
})

//Insere dados
routes.post('/add_ben', (req, res) => {
  const body = req.body

  try {
    if (!body) {
      return res.status(400).end()
    }

    if (exceptionVidas(req.body)) {
      return res
        .status(400)
        .send('Erro. O número mínimo de membros é maior que o contratado.')
    }

    verificaPlano(req.body)
    return res.json(req.body)
  } catch (err) {
    return res.status(400).send(err)
  }
})

routes.delete('/:id', (req, res) => {
  const id = req.params.id

  let newDB = db.filter(item => {
    if (!item[id]) {
      return item
    }
  })
  db = newDB
  return res.send(newDB)
})

module.exports = routes
