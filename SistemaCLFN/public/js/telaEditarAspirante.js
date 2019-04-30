validarSelects()


//função para validar os select
function validarSelects() {

    //pega o nome da unidade que o aspirante pertence marca no select
    const aspNomeUnidade = document.getElementById('aspNomeUnidade')
    const nomeUnidade = document.querySelector('#nomeUnidade')
    for(let item of nomeUnidade){
        if (item.value == aspNomeUnidade.value){
            item.selected = true
        }
    }

    //pega o nome da função que o aspirante pertence marca no select
    const aspFuncao = document.getElementById('aspFuncao')
    const funcaoAsp = document.querySelector('#funcaoAsp')
    for(let item of funcaoAsp){
        if (item.value == aspFuncao.value){
            item.selected = true
        }
    }

    //pega o nome da classe que o aspirante pertence marca no select
    const aspClasse = document.getElementById('aspClasse')
    const classeAsp = document.querySelector('#classeAsp')
    for(let item of classeAsp){
        if (item.value == aspClasse.value){
            item.selected = true
        }
    }

    //pega o valor do uniforme de atividade do aspirante e marca no select
    const aspUniformeAtividade = document.getElementById('aspUniformeAtividade')
    const uniformeAtividade = document.querySelector('#uniformeAtividade')
    for(let item of uniformeAtividade){
        if (item.value == aspUniformeAtividade.value){
            item.selected = true
        }
    }

    //pega o valor do uniforme oficial do aspirante e marca no select
    const aspUniformeOficial = document.getElementById('aspUniformeOficial')
    const uniformeOficial = document.querySelector('#uniformeOficial')
    for(let item of uniformeOficial){
        if (item.value == aspUniformeOficial.value){
            item.selected = true
        }
    }
}

function alteraMaiusculo(id){
    var valor = document.getElementById(id);
    var novoTexto = valor.value.toUpperCase();
    valor.value = novoTexto;
}