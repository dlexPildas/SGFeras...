const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Aspirante = new Schema({
    nomeAsp:{
        type:String,
        required: true
    },
    nomeUnidade: {
        type:Schema.Types.ObjectId,
        ref: 'unidades'
    },
    funcao: {
        type:String,
        required: true
    },
    classe: {
        type:String,
        required: true
    },
    clubeLocal: {
        type:String,
        required: true
    },
    uniformeAtividade: {
        type:String,
        required: true
    },
    uniformeOficial: {
        type:String,
        required: true
    },
    oQueFalta: {
        type:String,
    },
    eDirecao:{
        type: Boolean,
        default: false
    },
    senha:{
        type: String,
        default: 'feras123'
    }

})

mongoose.model('aspirantes', Aspirante)