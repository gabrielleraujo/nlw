module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {    // async e await são usados em conjunto para evitar de usar o then() toda vez que tivesse de esperar uma execução ser completada pelo baanco de dados.
    // inserir dados na tabela de proffys       // o banco de dados vai add todos os dados abaixo e somente quando terminar vai passar os dados para a variável insertedProffys, onde vai ter o proffy_id que eu preciso.
    const insertedProffys = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );    
    `)

    const proffy_id = insertedProffys.lastID

    // inserir daados na tbela classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );    
    `)

    const class_id = insertedClass.lastID

    // inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // aqui vou executar todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)       // O Promisse.all() consegue executar um array de muitas promessas (cada um db.run() é uma promessa de que vai rodar e n vai dar algum erro.), o await está aguardando o Promisse.all terminar de trabalhar para continuar a aplicação.
}
