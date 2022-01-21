const express = require('express')
const routes = express.Router()
const fs = require('fs')

const dataPlans = require('../db/plans.json')
const dataPrices = require('../db/prices.json')
let ben = require('../db/beneficiarios.json')
const { request } = require('http')

class RegistroBeneficiario {
  associados = []
  valorTotal = Number
  constructor(codigoReg, associados) {
    this.codigoReg = codigoReg
    this.associados = associados
    this.valorTotal = 0
  }

  calcularPlano() {
    this.associados.forEach(item => {
      this.valorTotal += item.price
    })
  }
}

class Associado {
  price = Number
  constructor(nome, idade) {
    this.nome = nome
    this.idade = idade
  }
}

//Busca dados
routes.get('/plans', (req, res) => {
  return res.json(dataPlans)
})

routes.get('/prices', (req, res) => {
  return res.json(dataPrices)
})

routes.get('/beneficiarios', (req, res) => {
  return res.json(ben)
})

//Insere dados
routes.post('/add_ben', (req, res) => {
  const body = req.body
  console.log(body.associados)
  /* if (!body) {
    return res.status(400).end()
  } */

  let listaAssociado = []
  let a1 = new Associado('Paula', 15)
  let a2 = new Associado('Renan', 25)
  let a3 = new Associado('Lucas', 55)
  listaAssociado.push(a1)
  listaAssociado.push(a2)
  listaAssociado.push(a3)
  let newRegistro = new RegistroBeneficiario('reg3', listaAssociado)

  // ben.push(JSON.stringify(newRegistro))
  ben.push(newRegistro)
  console.log(newRegistro)

  fs.readFile('../db/beneficiarios.json', function (err, content) {
    // if (err) throw err
    var parseJson = JSON.parse(listaAssociado)
    // for (i = 0; i < 2; i++) {
    //   parseJson.table.push({ id: i, square: i * i })
    // }
    fs.writeFile(
      '../db/beneficiarios.json',
      JSON.stringify(parseJson),
      function (err) {
        if (err) throw err
      }
    )
  })
  return res.json(newRegistro)
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
