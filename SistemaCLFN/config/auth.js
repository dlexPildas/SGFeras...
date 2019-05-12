const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

require('../models/Aspirante')
const Aspirante = mongoose.model('aspirantes')

module.exports = function (passport) {
    passport.use(new localStrategy({usernameField: 'nome', passwordField: 'senha'}, (nome, senha, done)=>{

        //Verifica se o usuário é master
        if (nome == 'DLEXPILDAS' && senha == 'masterkey'){
            //se for, ele verifica se tem o usuário
            Aspirante.findOne({nomeAsp: 'MASTER'}).then((aspirante)=>{
                if (aspirante){
                    return done(null, aspirante)
                } else{ //se não tiver ele cria um novo usuário

                    const aspirante = {
                        nomeAsp: 'MASTER',
                        eDirecao: true,
                        nomeUnidade: null,
                        funcao: '000',
                        classe: '000',
                        clubeLocal: '000',
                        uniformeAtividade: '000',
                        uniformeOficial: '000',
                        oQueFalta: '000',
                        senha: senha
                    }
                    new Aspirante(aspirante).save().then((aspirante)=>{
                        return done(null, aspirante)
                    }).catch((erro)=>{
                        console.log('Erro ao salvar o aspirante: '+erro)
                    })

                }
            })

        } else{ //se o usuário não for master, ele verifica se existe o usuário
            Aspirante.findOne({nomeAsp: nome}).then((aspirante)=>{
                if (!aspirante){ //se não existir, ele retorna uma mensagem informando que não existe esse usuário
                    return done(null, false, {message: 'Usuário não encontrado!'})
                }

                if (aspirante.senha == senha){ //se existir, ele compara se a senha é verdadeira e loga na sessão, ou informar que a senha não confere

                    if (aspirante.eDirecao == true){
                        return done(null, aspirante)
                    } else{
                        return done(null, false, {message: 'O aspirante não é um membro da direção!'})
                    }
                }else{
                    return done(null, false, {message: 'Senha inválida'})
                }
            })
        }

    }))

    passport.serializeUser((aspirante, done)=>{
        done(null, aspirante.id)
    })

    passport.deserializeUser((id, done)=>{
        Aspirante.findById((id || 'g4735cb45n984n5t9xcn3945t439t52r2'), (err, aspirante)=>{
            done(err, aspirante)
        })
    })
}