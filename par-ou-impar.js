const parouimpar = process.argv[2] 

const number = process.argv[3]

let valorEscritodamaquina = ""

let ganhador = ""

let resultadoNumero = 0

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
  
const numeroAleatorioEntreZeroeDez = getRndInteger(1, 10)

const parOuImparaleatoriodocomputador = getRndInteger(0,1)

if(parOuImparaleatoriodocomputador === 0){
    valorEscritodamaquina = "par"
}
if(parOuImparaleatoriodocomputador === 1){
    valorEscritodamaquina = "impar"
}

if(parouimpar === "par" && valorEscritodamaquina === "par"){
    console.log("Você e a maquina escolheram par, deu empate, tente novamente!")
}
if(parouimpar === "impar" && valorEscritodamaquina === "impar"){
    console.log("Você e a maquina escolheram impar, deu empate, tente novamente!")
}

if(parouimpar === "par" && valorEscritodamaquina === "impar"){
    resultadoNumero = +numeroAleatorioEntreZeroeDez + +number
    if(resultadoNumero % 2 === 0){
        ganhador = "você ganhou!"
    }
    else{
        ganhador = "você perdeu!"
    }
    console.log(`Você escolheu ${parouimpar} e o computador escolheu ${valorEscritodamaquina}. O Número gerado pelo computador foi ${numeroAleatorioEntreZeroeDez}, seu número digitado foi ${number} O resultado foi ${resultadoNumero}. ${ganhador} `)
}

if(parouimpar === "impar" && valorEscritodamaquina === "par"){
    resultadoNumero = +numeroAleatorioEntreZeroeDez + +number
    if(resultadoNumero % 2 === 0){
        ganhador = "você perdeu!"
    }
    else{
        ganhador = "você ganhou!"
    }
    console.log(`Você escolheu ${parouimpar} e o computador escolheu ${valorEscritodamaquina}. O Número gerado pelo computador foi ${numeroAleatorioEntreZeroeDez}, seu número digitado foi ${number} O resultado foi ${resultadoNumero}. ${ganhador} `)
}
