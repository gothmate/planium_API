const fs = require('fs')
const dataPlans = require('../db/plans.json')
const dataPrices = require('../db/prices.json')
var databaseBeneficiario = require('../beneficiarios.json')

module.exports = function verificaPlano(obj) {
  let jsonArray = []
  databaseBeneficiario.forEach(item => {
    jsonArray.push(item)
  })

  jsonArray.push(obj)

  for (let i = 0; i < jsonArray.length; i++) {
    for (let index = 0; index < dataPlans.length; index++) {
      if (jsonArray[i].codigoReg === dataPlans[index].codigo) {
        jsonArray[i].associados.forEach(el => {
          if (el.idade >= 0 && el.idade < 18) {
            el.preco = dataPrices[index].faixa1
          } else if (el.idade >= 18 && el.idade < 41) {
            el.preco = dataPrices[index].faixa2
          } else if (el.idade >= 41) {
            el.preco = dataPrices[index].faixa3
          }
        })
      }
    }

    jsonArray[i].valorTotal = 0
    jsonArray[i].associados.forEach(item => {
      jsonArray[i].valorTotal += item.preco
    })
  }

  let dataJson = JSON.stringify(jsonArray)

  fs.writeFile('beneficiarios.json', dataJson, 'utf8', err => {
    console.log(err)
  })

  return true
}