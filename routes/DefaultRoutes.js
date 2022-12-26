const express = require("express")
const router = express.Router()
const {uLogged} = require("../helpers/uLogged")
const tb_Post = require("../models/PostModel")



router.get('/', uLogged, async (req,res) =>{
    posts = await tb_Post.GetAllPosts()
    res.render("index", {
        posts:posts,
        fname: req.user.User_FirstName,
        lname: req.user.User_LastName,
        gender: req.user.User_Gender,
        description: req.user.User_Description,
        imgprofile: req.user.User_Img,
    })
})


module.exports = router