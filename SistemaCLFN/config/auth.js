const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

require('../models/Aspirante')
const Aspirante = mongoose.model('aspirantes')

module.exports = function (passport) {
    passport.use(new localStrategy({usernameField: 'nome', passwordField: 'senha'}, (nome, senha, done)=>{
        Aspirante.findOne({nomeAsp: nome}).then((aspirante)=>{
            if (!aspirante){
                return done(null, false, {message: 'Usuário não encontrado!'})
            }

            if (aspirante.senha == senha){

                if (aspirante.eDirecao == true){
                    return done(null, aspirante)
                } else{
                    return done(null, false, {message: 'O aspirante não é um membro da direção!'})
                }
            }else{
                return done(null, false, {message: 'Senha inválida'})
            }
        })
    }))

    passport.serializeUser((aspirante, done)=>{
        done(null, aspirante.id)
    })

    passport.deserializeUser((id, done)=>{
        Aspirante.findById(id, (err, aspirante)=>{
            done(err, aspirante)
        })
    })
}