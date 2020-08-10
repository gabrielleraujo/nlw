// procurar o botão
document.querySelector("#add-time")
// quando clicar no botão 
.addEventListener('click', cloneField)

// executar uma ação
function cloneField() {
    // duplicar os campos. Que campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)  // no JS vamos usar sempre Node para fazer referência a tags HTML. (para se aprofundar pesquise mais sobre 'DOM em JS').

    // pegar os campos. Que campos?
    const fields = newFieldContainer.querySelectorAll('input')

    // para cada campo, limpar
    fields.forEach(function (field){    // o forEach é o responsável por já passar o field do momento.
        // pega o field do momento e limpa ele.
        field.value = ""
    })

    // colocar na página: onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)   //fields significa campos.
}

/*
BACK-END

a função dele é preparar os pedidos, 
    essa preparação é chamada de regras de negócio
    todo Negócio tem regras, 
        por isso precisamos de uma LP

        temos que deixar essas regras no back-end pq no front o usuário pode manipular os dados.
        pq o cliente não tem acesso ao back-end.
        
ele lida e trabalha com os dados da aplicação trabalhado sdo jeito que ele precisa de acordo com as regras de negócio.

roda na máquina e não no navegador

o Node vai permitor a gente ler o JS na máquina .






*/

/* 
    ATALHOS TERMINAL

    pwd .. mostra em que página estou.

    NODE and NPM update: 

        para excluir o node e pacotes dependentes, aplicar o comando: sudo apt-get purge --auto-remove nodejs

        Use o módulo n do npm para atualizar o nó

        sudo npm cache clean -f
        sudo npm install -g n
        sudo n stable
        Para atualizar para a versão mais recente (e não estável atual), você pode usar

        sudo n latest
        Desfazer:
        sudo apt-get install --reinstall nodejs-legacy     # fix /usr/bin/node
        sudo n rm 6.0.0     # replace number with version of Node that was installed
        sudo npm uninstall -g n

    VERÇÃO EM USO:

    (base) gabe@gabrielle:~/Desktop/nlw$ npm -v
    6.14.6
    (base) gabe@gabrielle:~/Desktop/nlw$ node -v
    v12.18.3






*/