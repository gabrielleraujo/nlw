const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')    // estou pegando direto os atributos do objeto que estou extraindo.

function pageLanding(req, res){
    return res.render("index.html")     // agr estou usando o render por causa do nunjucks, daí não preciso mais do res.sendFile(__dirname + "/views/index.html")
}

async function pageStudy(req, res){       // o query recebe os dados que eu digitei na página e enviei clicando no botão.
    const filters = req.query       // o filters abaixo é onde está todos os dados que é preenchido na página pelo usuário 
    // se tiver campos vazios
    if (!filters.subject || !filters.weekday || !filters.time ){
        return res.render("study.html", { filters, subjects, weekdays }) 
    }

    // converter horas em minutos.
    const timeToMinutes = convertHoursToMinutes(filters.time)

    // se não tiver campos vazios
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_Schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'    
    `
    
    // caso haja erro na hora da consulta do banco de dados.
    
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })
    
    } catch (error) {
        console.log(error)
    }


    //return res.render("study.html", { proffys, filters, subjects, weekdays })    // dentro do render eu posso passar vários objetos, mas tenho que adaptar no HTML pra reconhecer eles.
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses (req, res) {
    const createProffy = require('./database/createProffy')

    // estava req.query, mas vamos usar o req.body pra ele poder esconder os dados que eu for inserir de aparecer na url da página, mas aí temos que configurar isso no server para q ele receba esse body. // Não preciso verificar se está vazio ou não pq o body devolve o POST com dados mesmo que vazio.
    
    // desestruturando pra não precisar repetir toda hora o req.body pra cada dado que estou acesando.
    const { name, avatar, whatsapp, bio, subject, cost, weekday, time_from, time_to } = req.body;    
    const proffyValue = {
        name,
        avatar,
        whatsapp,
        bio
    }

    // sabendo que o proffy_id já virá pelo banco de dados e já está tudo arrumado na função createProffy.
    const classValue = {
        subject,
        cost
    }

    
    // quando eu envio múltiplos campos ele vem em formato de array, então vamos mapear cada um deles e ir adicionando no schedule.
    // lembrando que esse é o weekday que tem no body, ele então é um array, então posso usar o map(), que vai me passar qual é o weekday do momento.
    const classScheduleValues = weekday.map( (weekday, index) => {
  
        return {
            // se eu repito os nomes, não precisso ficar repetindo.
            weekday,
            time_from: convertHoursToMinutes(time_from[index]),
            time_to: convertHoursToMinutes(time_to[index])
        }
    })

    
    try {
        
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })    // se deu tudo certo, cadastrou no banco de dados.

        // isso é só pra pessoa ver que o cadastro está no sistema.
        let queryString = `?subject=${subject}&weekday=${weekday[0]}&time=${time_from[0]}`
        return res.redirect("/study" + queryString)
        
    } catch (error) {
        console.log(error)
    }    
}

// tenho que requerer todas essas funcionalidades que estou exportando para poder usar na outra pasta.
module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}
