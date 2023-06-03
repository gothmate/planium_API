const express = require('express')
const routes = express.Router()
const fs = require('fs')

const dataPlans = require('../db/plans.json')
const dataPrices = require('../db/prices.json')
var databaseBeneficiario = require('../beneficiarios.json')
const { request } = require('http')
const exceptionVidas = require('../services/exceptionvida')
const exceptionRegistroNotFound = require('../services/exceptions')
var verificaPlano = require('../services/plans')

//Busca dados
routes.get('/plans', (req, res) => {
	return res.json(dataPlans);
});

routes.get('/prices', (req, res) => {
  return res.json(dataPrices)
})

routes.get('/beneficiarios', (req, res) => {
  return res.json(databaseBeneficiario)
})

//Insere dados
routes.post('/add_ben', (req, res) => {
  const body = req.body
  console.log(req.body)
  if (!body) {
    return res.status(400).end()
  }

  const ex = exceptionVidas(req.body)
  if (ex) {
    return res
      .status(400)
      .send('Número de usuários abaixo da exigência do plano.')
  }

  const retorno = verificaPlano(req.body)

  console.log("Retorno: ", retorno)
  res.send(retorno)
  return
})

module.exports = routes
