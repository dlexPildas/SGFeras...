const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Presenca = new Schema({
    jan: {
        type: Boolean,
        required: true
    },
    fev: {
        type: Boolean,
        required: true
    },
    mar: {
        type: Boolean,
        required: true
    },
    abr: {
        type: Boolean,
        required: true
    },
    mai: {
        type: Boolean,
        required: true
    },
    jun: {
        type: Boolean,
        required: true
    },
    jul: {
        type: Boolean,
        required: true
    },
    ago: {
        type: Boolean,
        required: true
    },
    set: {
        type: Boolean,
        required: true
    },
    out: {
        type: Boolean,
        required: true
    },
    nov: {
        type: Boolean,
        required: true
    },
    dez: {
        type: Boolean,
        required: true
    },
    aspirante:{
        type:Schema.Types.ObjectId,
        ref: 'aspirantes',
        required: true
    },
})


mongoose.model('presencas', Presenca)