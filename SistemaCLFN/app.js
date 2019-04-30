const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const flash  = require('connect-flash')
const app = express()
const admin = require('./routes/admin')


//session
app.use(session({
    secret: 'clfn',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

//middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    //res.locals.error = req.flash('error')
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
mongoose.connect('mongodb://localhost/clfn').then(()=>{
    console.log('conectado');
}).catch((erro)=>{
    console.log('Não conectado: '+erro);
})

//Public
app.use(express.static(path.join(__dirname, "public")))


/*------------------ROTAS--------------------*/
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.use('/admin', admin)


//Outros
const porta = 8083
app.listen(porta, ()=>{
    console.log('Servidor rodando')
})

