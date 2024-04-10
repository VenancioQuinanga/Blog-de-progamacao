//carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Path = require('path')
const app = express()
const admin = require('./routes/admin')
const user = require('./routes/user')
const session = require('express-session')
const flash = require('connect-flash')
//const passport = require("passport")
//require("./config/auth")(passport)

//configurações

//bodyparser
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(bodyParser.json())

//handlebars
app.engine('handlebars',handlebars.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

//session
app.use(session({
    secret:'CursoNodeJs',
    resave:true,
    saveUninitialized:true,
    cookie:{secure:false}
}))

//passport
/*
app.use(passport.initialize())
app.use(passport.session())
*/

//Flash
app.use(flash())

//Midlewars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    next()
})

//Permitindo que outras origens se conectem a essa API ou APP
/*
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','Get,Head,Options,Post,Patch,Delete')
    res.header("Access-Control-Allow-Headers","Origin,X-Rquested-With,Content-Type,Accept,Authorization")
    next()
})
*/  

//public 
app.use(express.static(Path.join((__dirname,'public'))))

//rotas
app.use('',admin)
app.use('/users',user)

//outros

const PORT = process.env.PORT || 8081

app.listen(PORT,()=>{
    console.log('servidor rodando')
})
