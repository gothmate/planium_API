const fs = require('fs')
const dataPlans = require('../db/plans.json')
const dataPrices = require('../db/prices.json')
var databaseBeneficiario = require('../beneficiarios.json')

module.exports = function verificaPlano(obj) {
  console.log(obj)

  let jsonArray = []
  databaseBeneficiario.forEach(item => {
    jsonArray.push(item)
  })

  jsonArray.push(obj)

  for (let arrayItem = 0; arrayItem < jsonArray.length; arrayItem++) {
    for (let index = 0; index < dataPlans.length; index++) {
      if (jsonArray[arrayItem].codigoReg === dataPlans[index].codigo) {
        dataPrices.forEach(price => {
          if (dataPlans[index].codigo === price.codigo) {
            if (jsonArray[arrayItem].associados.length >= price.minimo_vidas) {
              jsonArray[arrayItem].associados.forEach(el => {
                if (el.idade >= 0 && el.idade < 18) {
                  el.preco = price.faixa1
                } else if (el.idade >= 18 && el.idade < 41) {
                  el.preco = price.faixa2
                } else if (el.idade >= 41) {
                  el.preco = price.faixa3
                }
              })
            }
          }
        })
      }
    }

    jsonArray[arrayItem].valorTotal = 0
    jsonArray[arrayItem].associados.forEach(item => {
      jsonArray[arrayItem].valorTotal += item.preco
    })
  }

  let dataJson = JSON.stringify(jsonArray)

  fs.writeFile('beneficiarios.json', dataJson, 'utf8', err => {
    console.log(err)
  })

  return jsonArray[jsonArray.length - 1]
}
