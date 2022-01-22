module.exports = function exceptionVidas(obj) {
  let valid = false
  if (obj.associados.length == 0) {
    valid = true
  }
  return valid
}
