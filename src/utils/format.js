// dados

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]


/* template engine: faz a contrução da sua aplicação do layout toda via motor, e esse motor usa de estratégias de programação para fazer o seu HTML. */

// require('express')()  |  express é uma função que retorna um objeto.
// para rodar, colocar no terminal node src/server.js


// funcionalidades

// o '+ na frente do subjectNumber é pra garantir que ele seja um número.

function getSubject(subjectNumber){
    const position = +subjectNumber - 1;    // essa expressão pq no HTML tinha defnido começando a contar de 1 as matérias;
    return subjects[position]
}

function convertHoursToMinutes(time) {
    // separando dentro de 2 variáveis para add o resultado do split  (que está em string) correspondente a hora e minutos.
    const [hour, minutes] = time.split(':')    // ':' vai ser o meu separador de tring.
    return Number((hour * 60) + minutes)       // Number() é uma funcionalidade que garante que o resultado vai ser um número e não uma string.

}


module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}