const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const flash  = require('connect-flash')
const app = express()
const admin = require('./routes/admin')
const usuario = require('./routes/usuario')
const passport = require('passport')
const fetch = require('node-fetch');

require('./config/auth')(passport)

const db = require('./config/db')

//session
app.use(session({
    secret: 'clfn',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

//body-parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')



//mongo
mongoose.Promisse = global.Promisse
mongoose.connect('mongodb://clfn:leinad10011.@mongodb.uhserver.com:27017/clfn', {useNewUrlParser: true}).then((msg)=>{
    console.log('conectado: '+msg);
}).catch((erro)=>{
    console.log('Não conectado: '+erro );
})



//Public
app.use(express.static(path.join(__dirname, "public")))


/*------------------ROTAS--------------------*/
app.get('/', (req, res)=>{

    res.render('index')
})


app.use('/admin', admin)
app.use('/usuario', usuario)


//Outros
const porta = process.env.PORT || 8083
app.listen(porta, ()=>{
    console.log('Servidor rodando: '+porta)

})

