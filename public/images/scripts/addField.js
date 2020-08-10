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

