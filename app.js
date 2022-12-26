//Modules NodeJs
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const session = require("express-session")
const flash = require("connect-flash")
require('dotenv/config')
const path = require("path")
const passport = require("passport")
const conn = require("./models/db")
const SequelizeStore = require('connect-session-sequelize')(session.Store)//add .Store pls
const sessionStore = new SequelizeStore({
    db: conn.db_guimabook,
    collection: 'sessions'//session table
})
const tb_Post = require("./models/PostModel")
/* sessionStore.sync({forced:true}) */
//Routes Js
const DefaultRoutes = require("./routes/DefaultRoutes")
const LoginRoutes = require("./routes/LoginRoutes")
const PostRoutes = require("./routes/PostsRoutes")
//Config
    //Connect Flash
    app.use(flash())
    //Session
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        store: sessionStore,
        saveUninitialized: true,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if S from reading the cookie 
            maxAge: null // session max age in miliseconds
        }

    }))
    //Middleware    
    app.use((req,res,next) =>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.user = req.user || null
        next()
    })

    app.use(passport.initialize())
    app.use(passport.session())

    //BodyParser
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    //Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Public Assets
    app.use(express.static(path.join(__dirname,"public")))
//Routes
    app.use('/', DefaultRoutes)
    app.use('/login/', LoginRoutes)
    app.use('/posts/', PostRoutes) 
//Code
app.listen(process.env.WEB_PORT, ()=>{

    console.log('\x1b[36m'," ██████╗ ██╗   ██╗██╗███╗   ███╗ █████╗ ██████╗  ██████╗  ██████╗ ██╗  ██╗",'\x1b[0m')
    console.log('\x1b[36m',"██╔════╝ ██║   ██║██║████╗ ████║██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝",'\x1b[0m')
    console.log('\x1b[36m',"██║  ███╗██║   ██║██║██╔████╔██║███████║██████╔╝██║   ██║██║   ██║█████╔╝ ",'\x1b[0m')
    console.log('\x1b[36m',"██║   ██║██║   ██║██║██║╚██╔╝██║██╔══██║██╔══██╗██║   ██║██║   ██║██╔═██╗ ",'\x1b[0m')
    console.log('\x1b[36m',"╚██████╔╝╚██████╔╝██║██║ ╚═╝ ██║██║  ██║██████╔╝╚██████╔╝╚██████╔╝██║  ██╗",'\x1b[0m')
    console.log('\x1b[36m'," ╚═════╝  ╚═════╝ ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝",'\x1b[0m')
                                                                              
    console.log('\x1b[32m', "Servidor iniciado na porta: ", '\x1b[32m', + process.env.WEB_PORT, '\x1b[0m')


})