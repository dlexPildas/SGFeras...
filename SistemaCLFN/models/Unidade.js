const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Unidade = new Schema ({
    nome:{
        type:String,
        required:true
    },
    conselheiro:{
        type:Schema.Types.ObjectId,
        ref: 'aspirantes',
    },
    capitao:{
        type:Schema.Types.ObjectId,
        ref: 'aspirantes',

    },
    totalMembros:{
        type: Number,
        required: true
    }
})

mongoose.model('unidades', Unidade)