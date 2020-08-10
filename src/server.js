// servidor
const express = require('express')
const server = express()

const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

// configurar nunjucks (tamplate engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// início e configuração do servidor
                                        // static é tudo que é do front-end, coloquei tudo na pasta public
server
// para receber os dados do req.body, pq por padrão o express não aceita esses dados.
.use(express.urlencoded({ extended: true }))    // só que ainda assim se eu preencher e clicar em enviar o formulário, os dados ainda vão estar vindo do url, pq quem está mandando os dados por alí é o formulário do HTML, a partir da configuração do method automático GET (method="GET"), por isso temos que trocar para POST. quando eu mudo pra POST agora os dados estão escondidos.


// configurar arquivos estáticos (CSS, scripts, imagens)
.use(express.static("public"))    // tudo q for .use() é uma configuração do servidor.
// rotas da aplicação
.get("/", pageLanding)       // .get é uma funcionalidade que vai receber argumentos. Quando rodar essa função o express que vai passar a requisição e a resposta. 
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)       // logo, tenho que criar uma nova funcionalidade no pages.js

// start do servidor
.listen(5500)