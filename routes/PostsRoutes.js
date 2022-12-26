const express = require("express")
const router = express.Router()
const tb_Posts = require("../models/PostModel")
const {uLogged} = require("../helpers/uLogged")

router.post('/add/' , uLogged, (req,res) =>{
    if (req.body.postcontent.length > 100) {
        req.flash("error_msg", "Sua mensagem não pode conter mais que 100 caracteres")
        res.redirect('/')
    }

    if (!req.body.postcontent || typeof req.body.postcontent == undefined || typeof req.body.postcontent == "") {
        req.flash("error_msg", "Você não pode postar mensagens vazias.")
        res.redirect('/')
    }else{
        tb_Posts.tb_Post.create({
            tbUserId: req.user.id,
            Post_Content: req.body.postcontent,
        })
        .then(function(){
            req.flash("success_msg", "Postado com sucesso")
            res.redirect('/')
        }).catch(function(erro){
            req.flash("error_msg", "Ocorreu um erro interno: " + erro)
            res.redirect('/')
        })
    }
})


module.exports = router