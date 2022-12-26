const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs");

//UserModel
const tb_User = require("../models/UserModel")


module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) =>{
        tb_User.findOne({where: {User_Email: email}}).then((usuario) =>{
            if (!usuario) {
                console.log("Esta conta não existe")
                return done(null, false, {message: "Esta conta não existe"})   
            }

            bcrypt.compare(senha, usuario.User_Password, (erro, batem) =>{
                if(batem){
                    return done(null, usuario)
                }else{
                    console.log("Senha incorreta")
                    return done(null, false, {message: "Senha incorreta"})
                }
            })

        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

        passport.deserializeUser(function (id, done) {
            tb_User.findOne({ where: { id: id } }).then((user) => {
              console.log(user)
              done(null, user)
            })
          })  
        }