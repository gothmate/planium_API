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

  adicionarPrecoPorIdade() {
    this.associados.forEach(associado => {
      if (associado.idade >= 0 && associado.idade < 18) {
        associado.price = 0
      }
    })
  }
}

export default RegistroBeneficiario
