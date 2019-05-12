

//funcão para verificar se o nome do conselheiro é igual ao do capitap
function verificaConselheiroIgualCapitao() {
    const conselheiro = document.getElementById('conselheiro')
    const capitao = document.getElementById('capitao')

    if (conselheiro.value!=undefined && conselheiro.value == capitao.value && conselheiro.value !=''){

        alert('O nome do conselheiro é igual ao do capitão!')
        return false
    }else{
        return true
    }


}

