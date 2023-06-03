const dataPlans = require('../db/plans.json')

module.exports = function exceptionRegistroNotFound(obj) {
  dataPlans.forEach(el => {
    if (el.codigo === obj.codigoReg) {
      return true
    }
  })
  return false
}
