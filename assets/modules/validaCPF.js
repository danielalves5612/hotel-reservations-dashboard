export default class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            configurable: false,
            enumerable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    valida(){
        if(typeof this.cpfLimpo === 'undefined') return false
        if(this.cpfLimpo.length !== 11) return false
        if(this.isSequencia()) return false

        const cpfParcial = this.cpfLimpo.slice(0, -2)
        const digito1 = this.digito(cpfParcial)
        const digito2 = this.digito(cpfParcial + digito1)
        const novoCpf = cpfParcial + digito1 + digito2

        return novoCpf === this.cpfLimpo
    }

    isSequencia(){
         const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
         return sequencia === this.cpfLimpo

    }

    static digito(cpfParcial){
        const criaArray = Array.from(cpfParcial)
        let recursivo = cpfParcial.length + 1
        let total = criaArray.reduce(function(acumulador, valor){
            acumulador = acumulador + (recursivo * Number(valor))
            recursivo--
            return acumulador
        },0)
        const digito = 11 - (total % 11)
        return digito > 9 ? '0' : String(digito)
    }
}