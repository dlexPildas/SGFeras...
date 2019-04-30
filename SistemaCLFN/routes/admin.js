const express = require('express')
const router = express()
const mongoose = require('mongoose')
require('../models/Aspirante')
require('../models/Pagamento')
require('../models/Presenca')
require('../models/Unidade')
const Unidade = mongoose.model('unidades')
const Aspirante = mongoose.model('aspirantes')
const Presenca = mongoose.model('presencas')
const Pagamento = mongoose.model('pagamentos')



//rota para tela inicial
router.get("/", (req, res)=>{
    res.redirect('/admin/unidade')
})



//--------------ROTAS VOLTADAS PARA UNIDADES----------------//

//rota para ir a tela de unidades
router.get('/unidade', (req, res)=>{

    //Faz a busca das unidades no banco e pega todas as tabelas relacionadas ao a tabela unidade
    Unidade.find().sort({nome: 1}).populate('conselheiro').populate('capitao').then((unidades)=>{
        if(unidades){ //Verifica se há uma unidade
            //faz a busca pela tabela aspirante
            Aspirante.find().then((aspirantes)=>{
                res.render('admin/unidade', {unidades: unidades, aspirantes: aspirantes})
            }).catch((erro)=>{
                console.log('Erro ao procurar um aspirante: '+erro)
            })

        }else{
            res.render('admin/unidade')
        }
    }).catch((erro)=>{
        console.log('Erro: '+erro)
    })

})

//rota para salvar uma unidade
router.post('/unidade/nova', (req, res)=>{
    const novaUnidade = new Object()

    //verifica se tem conselheiro ou capitão cadastrado e acrescenta ao objeto
    if (req.body.capitao != "" && req.body.conselheiro != ""){
        novaUnidade.nome = req.body.nome
        novaUnidade.conselheiro = req.body.conselheiro
        novaUnidade.capitao = req.body.capitao
        novaUnidade.totalMembros = req.body.totalMembros

    }else{
        novaUnidade.nome = req.body.nome
        novaUnidade.totalMembros = req.body.totalMembros
    }

    //Cria um novo registro de unidade
    new Unidade(novaUnidade).save().then(()=>{
        res.redirect('/admin/unidade')
    }).catch( (erro)=>{
        console.log('Erro ao salvar a unidade: '+erro)
    })
})

//rota para deletar uma unidade
router.get('/unidade/deletar/:id', (req, res)=>{
    Unidade.remove({_id: req.params.id}).then(()=>{
        res.redirect('/admin/unidade')
    }).catch((erro)=>{
        res.redirect('/admin/unidade')
    })
})

//rota para editar uma unidade
router.get('/unidade/editar/:id', (req, res)=>{
    Unidade.findOne({_id: req.params.id}).then((unidade)=>{
        if(unidade){
            Aspirante.find().then((aspirantes)=>{
                res.render('admin/editarUnidade', {unidade: unidade, aspirantes: aspirantes})
            }).catch((erro)=>{
                console.log('Erro ao procurar um aspirante: '+erro)
            })
        }else{
            console.log('Unidade não encontrada!')
        }
    }).catch((erro) =>{
        console.log('Erro ao procurar a unidade: '+erro)
    })
})

//rota para salvar os dados editados no banco
router.post('/unidade/editar', (req, res) =>{
    Unidade.findOne({_id: req.body.id}).then((unidade)=>{
        //verrifica se a unidade foi encontrada
        if (unidade){

            unidade.nome = req.body.nome
            unidade.totalMembros = req.body.totalMembros

            //verifica se existe um conselheiro cadastrado
            if (req.body.conselheiro != ""){
                unidade.conselheiro = req.body.conselheiro
            }else{ //se não, ele coloca com o valor null
                unidade.conselheiro = null
            }

            //verifica se existe um capitão cadastrado
            if (req.body.capitao != ""){ //se existir, ele acrescenta o capitão na unidade
                unidade.capitao = req.body.capitao
            } else{ //se não, ele coloca com o valor null
                unidade.capitao = null
            }

            //edita os dados da unidade no banco de dados
            unidade.save().then(()=>{
                res.redirect('/admin/unidade')
            }).catch((erro) =>{
                console.log('Erro ao editar unidade: '+erro)
                res.redirect('/admin/unidade')
            })
        }
    })
})


//--------------ROTAS VOLTADAS PARA ASPIRANTES----------------//
router.get('/aspirante', (req, res)=>{
    Unidade.find().then((unidades)=>{
        Aspirante.find().sort({nomeAsp: 1}).then((aspirantes)=>{
            res.render('admin/aspirante', {unidades: unidades, aspirantes: aspirantes})
        }).catch((erro)=>{
            console.log('erro ao buscar os aspirantes: '+erro)
        })
    }).catch((erro)=>{
        console.log('erro ao buscar as unidades: '+erro)
    })

})

//rota para buscar algum aspirante
router.post('/aspirante/buscar', (req, res)=>{
    Unidade.find().then((unidades)=>{
        Aspirante.find({nomeAsp: {$regex: req.body.busca} }).sort({nomeAsp: 1}).then((aspirantes)=>{
            res.render('admin/aspirante', {unidades: unidades, aspirantes: aspirantes})
        }).catch((erro)=>{
            console.log('erro ao buscar os aspirantes: '+erro)
        })
    }).catch((erro)=>{
        console.log('erro ao buscar as unidades: '+erro)
    })
})

//rota para adicionar um novo aspirante
router.post('/aspirante/novo', (req, res)=>{

    //cria um objeto "aspirante" com os dados retornados
    const aspirante = {
        nomeAsp: req.body.nomeAsp,
        nomeUnidade: req.body.nomeUnidade,
        funcao: req.body.funcao,
        classe: req.body.classe,
        clubeLocal: req.body.nomeClubeLocal,
        uniformeAtividade: req.body.uniformeAtividade,
        uniformeOficial: req.body.uniformeOficial,
        oQueFalta: req.body.oQueFaltaUniformeOficial
    }
    //salva no banco de dados o objeto "Aspirante"
    new Aspirante(aspirante).save().then((asp)=>{


        //algoritmo de validação dos meses
        const validar = [req.body.mes1,req.body.mes2,req.body.mes3,req.body.mes4,req.body.mes5,req.body.mes6,req.body.mes7,
            req.body.mes8,req.body.mes9,req.body.mes10,req.body.mes11,req.body.mes12]

        for (var i = 0; i<12; i++){
            if (validar[i]==undefined){
                validar[i] = false
            }
            else {
                validar[i] = true
            }
        }

        /*cria um objeto "presenca" com os dados retornados do formulário
        e acrescenta o id do aspirante que acabou de ser criado*/
       const presenca = {
            jan: validar[0],
            fev: validar[1],
            mar: validar[2],
            abr: validar[3],
            mai: validar[4],
            jun: validar[5],
            jul: validar[6],
            ago: validar[7],
            set: validar[8],
            out: validar[9],
            nov: validar[10],
            dez: validar[11],
            aspirante: asp._id
        }



        //algoritmo de validação dos pagamentos
        const validar2 = [req.body.pag1,req.body.pag2,req.body.pag3,req.body.pag4,req.body.pag5,req.body.pag6,req.body.pag7,
            req.body.pag8,req.body.pag9,req.body.pag10,req.body.pag11,req.body.pag12]
        for (var i = 0; i<12; i++){
            if (validar2[i]==undefined){
                validar2[i] = 0
            }else{
                validar2[i] = parseInt(validar2[i], 10)
                console.log(validar2[i])
            }
        }

        /*cria um objeto "pagamento" com os dados retornados do formulário
        e acrescenta o id do aspirante que acabou de ser criado*/
        const pagamento = {
            jan: validar2[0],
            fev: validar2[1],
            mar: validar2[2],
            abr: validar2[3],
            mai: validar2[4],
            jun: validar2[5],
            jul: validar2[6],
            ago: validar2[7],
            set: validar2[8],
            out: validar2[9],
            nov: validar2[10],
            dez: validar2[11],
            aspirante: asp._id
        }

        //salva no banco de dados um novo registro da collection presencas
        new Presenca(presenca).save().then(()=>{

            //salva no banco de dados um novo registro da collection pagamentos
            new Pagamento(pagamento).save().then(()=>{
                res.redirect('/admin/aspirante')
            }).catch((erro)=>{
                console.log('Erro ao salvar o pagamento: '+erro)
            })
        }).catch((erro)=>{
            console.log('Erro ao salvar a presenca: '+erro)
        })
    }).catch((erro)=>{
        console.log('Erro ao salvar o aspirante: '+erro)
    })


})

//rota para remover um aspirante
router.get('/aspirante/remover/:id', (req, res)=>{
    Aspirante.remove({_id: req.params.id}).then(()=>{
        Presenca.remove({aspirante: req.params.id}).then(()=>{
            Pagamento.remove({aspirante: req.params.id}).then(()=>{
                res.redirect('/admin/aspirante')
            }).catch((erro)=>{
                console.log('Erro ao excluir um pagamento: '+erro)
            })
        }).catch((erro)=>{
            console.log('Erro ao excluir uma presença: '+erro)
        })
    }).catch((erro)=>{
        console.log('Erro ao excluir um aspirante: '+erro)
    })
})

//rota para editar os dados de um aspirante
router.get('/aspirante/editar/:id', (req, res)=>{
    Aspirante.findOne({_id: req.params.id}).then((aspirante)=>{
        Presenca.findOne({aspirante: req.params.id}).then((presenca)=>{
            Pagamento.findOne({aspirante: req.params.id}).then((pagamento)=>{
                Unidade.find().then((unidades)=>{
                    res.render('admin/editarAspirante', {aspirante:aspirante, pagamento: pagamento, presenca:presenca, unidades: unidades})
                })
            }).catch((erro)=>{
                console.log('Pagamento do aspirante não foi encontrado: '+erro)
            })
        }).catch((erro)=>{
            console.log('Presença do aspirante não foi encontrada: '+erro)
        })
    }).catch((erro)=>{
        console.log('Aspirante não foi encontrado: '+erro)
    })
})


//rota para pegar os novos dados do aspirante e salvá-los no banco de dados
router.post('/aspirante/editar', (req, res)=>{
    Aspirante.findOne({_id: req.body.id}).then((aspirante)=>{
        Presenca.findOne({aspirante: req.body.id}).then((presenca)=>{
            Pagamento.findOne({aspirante: req.body.id}).then((pagamento)=>{

                //Coloca os novos dados dos aspirantes no registro e salva
                aspirante.nomeAsp = req.body.nomeAsp
                aspirante.nomeUnidade = req.body.nomeUnidade
                aspirante.funcao = req.body.funcao
                aspirante.classe = req.body.classe
                aspirante.clubeLocal = req.body.nomeClubeLocal
                aspirante.uniformeAtividade = req.body.uniformeAtividade
                aspirante.uniformeOficial = req.body.uniformeOficial
                aspirante.oQueFalta = req.body.oQueFaltaUniformeOficial
                aspirante.save().then(()=>{

                    //chama a função para fazer a validação do valor dos meses
                    const validar = [req.body.mes1,req.body.mes2,req.body.mes3,req.body.mes4,req.body.mes5,req.body.mes6,req.body.mes7,
                        req.body.mes8,req.body.mes9,req.body.mes10,req.body.mes11,req.body.mes12]
                    const resultado = validarMeses(validar)

                    //Coloca os novos dados da presença dos aspirantes no registro "presença" e salva
                    presenca.jan = resultado[0]
                    presenca.fev = resultado[1]
                    presenca.mar = resultado[2]
                    presenca.abr = resultado[3]
                    presenca.mai = resultado[4]
                    presenca.jun = resultado[5]
                    presenca.jul = resultado[6]
                    presenca.ago = resultado[7]
                    presenca.set = resultado[8]
                    presenca.out = resultado[9]
                    presenca.nov = resultado[10]
                    presenca.dez = resultado[11]
                    presenca.save().then(()=>{
                        //chama a função para fazer a validação do valor dos pagamentos
                        const validar2 = [req.body.pag1,req.body.pag2,req.body.pag3,req.body.pag4,req.body.pag5,req.body.pag6,req.body.pag7,
                            req.body.pag8,req.body.pag9,req.body.pag10,req.body.pag11,req.body.pag12]
                        const result = validarPagamentos(validar2)

                        //Coloca os novos dados da presença dos aspirantes no registro "pagamento" e salva
                        pagamento.jan = result[0]
                        pagamento.fev = result[1]
                        pagamento.mar = result[2]
                        pagamento.abr = result[3]
                        pagamento.mai = result[4]
                        pagamento.jun = result[5]
                        pagamento.jul = result[6]
                        pagamento.ago = result[7]
                        pagamento.set = result[8]
                        pagamento.out = result[9]
                        pagamento.nov = result[10]
                        pagamento.dez = result[11]
                        pagamento.save().then(()=>{
                            res.redirect('/admin/aspirante')
                        }).catch((erro)=>{
                            console.log('Não foi possível alterar o pagamento: '+erro)
                        })
                    }).catch((erro)=>{
                        console.log('Não foi possível alterar a presença: '+erro)
                    })
                }).catch((erro)=>{
                    console.log('Não foi possível alterar o aspirante: '+erro)
                })
            }).catch((erro)=>{
                console.log('Pagamento do aspirante não foi encontrado: '+erro)
            })
        }).catch((erro)=>{
            console.log('Presença do aspirante não foi encontrada: '+erro)
        })
    }).catch((erro)=>{
        console.log('Aspirante não foi encontrado: '+erro)
    })
})


//função para validar os meses, pois o valor retornado pelo checkbox não é do tipo booleano
function validarMeses(validar){

    for (var i = 0; i<12; i++){
        if (validar[i]==undefined){
            validar[i] = false
        }
        else {
            validar[i] = true
        }
    }
    return validar;
}

//função para validar os pagamentos, pois o valor retornado pelo input do tipo "Number" é do tipo string e precisa
//ser do tipo convertido para int
function validarPagamentos(validar2){
    for (var i = 0; i<12; i++){
        if (validar2[i]==undefined){
            validar2[i] = 0
        }else{
            validar2[i] = parseInt(validar2[i], 10)
        }
    }
    return validar2;
}


module.exports = router