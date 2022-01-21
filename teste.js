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
