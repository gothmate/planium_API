const fs = require('fs')
const dataPlans = require('../db/plans.json')
const dataPrices = require('../db/prices.json')
var databaseBeneficiario = require('../beneficiarios.json')

module.exports = function exceptionVidas(obj) {
  for (let index = 0; index < dataPrices.length; index++) {
    if (
      dataPrices[index].codigo === obj.codigoReg &&
      obj.associados.length < dataPrices[index].minimo_vidas
    ) {
      return true
    }
  }
}
