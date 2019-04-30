const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pagamento = new Schema({
    jan: {
        type: Number,
        required: true
    },
    fev: {
        type: Number,
        required: true
    },
    mar: {
        type: Number,
        required: true
    },
    abr: {
        type: Number,
        required: true
    },
    mai: {
        type: Number,
        required: true
    },
    jun: {
        type: Number,
        required: true
    },
    jul: {
        type: Number,
        required: true
    },
    ago: {
        type: Number,
        required: true
    },
    set: {
        type: Number,
        required: true
    },
    out: {
        type: Number,
        required: true
    },
    nov: {
        type: Number,
        required: true
    },
    dez: {
        type: Number,
        required: true
    },
    aspirante:{
        type:Schema.Types.ObjectId,
        ref: 'aspirantes',
        required: true
    },
})


mongoose.model('pagamentos', Pagamento)