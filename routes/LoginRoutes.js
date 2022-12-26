const express = require("express")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const tb_User = require("../models/UserModel")
require("../config/auth")(passport)
const router = express.Router()
const {uLoggedR} = require("../helpers/uLoggedR")

router.get('/', uLoggedR, (req,res)=>{
    res.render("Login/login")
})

router.post('/log-user/',(req, res, next)=>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
    (req, res, next)
})

router.post('/cad-user', (req,res)=>{
    var errors = []

    if (!req.body.firstname || typeof req.body.firstname == undefined || typeof req.body.firstname == "") {
        errors.push({texto: "Campo nome não pode estar vazio!"})
    }

    if (!req.body.lastname || typeof req.body.lastname == undefined || typeof req.body.lastname == "") {
        errors.push({texto: "Campo email não pode estar vazio!"})
    }
    if (!req.body.email || typeof req.body.email == undefined || typeof req.body.email == "") {
        errors.push({texto: "Campo senha não pode estar vazio!"})
    }
    if (!req.body.senha || typeof req.body.senha == undefined || typeof req.body.senha == "") {
        errors.push({texto: "Campo senha não pode estar vazio!"})
    }
    if (!req.body.nasc || typeof req.body.nasc == undefined || typeof req.body.nasc == "") {
        errors.push({texto: "Campo senha não pode estar vazio!"})
    }

    if (!req.body.gender || typeof req.body.gender == undefined || typeof req.body.gender == "") {
        errors.push({texto: "Campo senha não pode estar vazio!"})
    }
    
    if (req.body.senha.length < 6) {
        req.flash("error_msg", "A senha deve conter no mínimo 6 caracteres")
        res.redirect('/login/')
    }

    if (errors.length > 0) {
        req.flash("error_msg", "Todos os campos devem estar preenchidos")
        res.redirect('/')
    }else{
        tb_User.findOne({where: {User_Email: req.body.email}}).then((usuario) =>{

            if (usuario) {
                req.flash("error_msg", "Esse Email já foi cadastrado em nosso sistema")
                res.redirect('/')
            }else{
    
    
    
                bcrypt.genSalt(10, (erro, salt) =>{
                    UserPassword = req.body.senha
    
                    bcrypt.hash(UserPassword, salt, (erro, hash) =>{
                        if (erro) {
                            req.flash("error_msg", "Ocorreu um erro na hora de encryptar suas informações")
                            res.redirect('/')
                        }
    
                        function generate_token(length){
                            //edit the token allowed characters
                            var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
                            var b = [];  
                            for (var i=0; i<length; i++) {
                                var j = (Math.random() * (a.length-1)).toFixed(0);
                                b[i] = a[j];
                            }
                            return b.join("");
                        }

                        encryptedpass = hash
                        tb_User.create({
                            User_Token: generate_token(30),
                            User_FirstName: req.body.firstname,
                            User_LastName: req.body.lastname,
                            User_Email: req.body.email,
                            User_Password: encryptedpass,
                            User_Nasc: req.body.nasc,
                            User_Gender: req.body.gender,
                        }).then(function(){
                            req.flash("success_msg", "Usuário cadastrado com sucesso.")
                            res.redirect('/login/')
                        }).catch(function(erro){
                            req.flash("error_msg", "Usuário não foi cadastrado com sucesso erro: " + erro)
                            res.redirect('/login/')
                        })
                    })
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Ocorreu um erro interno kkk: " + err)
            res.redirect('/login/')
        })
    }
})


module.exports = router