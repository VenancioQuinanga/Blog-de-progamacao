const express = require('express')
const router = express.Router()
const user = require('../models/user')
const session = require("express-session");

router.get('/login',(req,res)=>{
    res.render("users/login",{user:req.session.name})
})

router.post('/login',(req,res)=>{

    /*
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req,res,next)
    */

    let email = req.body.email
    let senha = req.body.senha

    user.findOne({where:{email:email}}).then((u)=>{

        if (u) {
            if (u.dataValues.senha == senha) {
                req.session.name = email
                let user_name = u.dataValues.nome
                
                if (u.dataValues.isadmin == 1) {
                    req.flash('success_msg','Seja bem vindo '+ user_name +'')
                    res.redirect("/")
                } else {
                    req.flash('error_msg','Voce não é um administrador')
                    res.redirect("/users/login")
                }
                
            } else {
                req.flash('error_msg','Senha incorreta')
                res.redirect("/users/login")
            }
            
        }else{

            req.flash('error_msg','Essa conta não existe')
            res.redirect("/users/login")
        }
        
    }).catch(()=>{
        req.flash('error_msg','Houve um erro interno')
        res.redirect("/users/login")
    })
    
    
})

router.get("/logout",(req,res)=>{
    
    req.session.name = ''
    req.flash("success_msg","Deslogado com sucesso")
    res.redirect("/")
})

router.get('/registro',(req,res)=>{
    res.render("users/registro",{user:req.session.name})
})

router.post('/registro',(req,res)=>{
    var erros = []

    if (req.body.senha != req.body.senha2) {
        erros.push({texto:"Senhas são diferentes"})
    }
    
    if (req.body.senha.length < 6) {
        erros.push({texto:"Senha muito pequena"})
    }

    if (erros.length > 0) {
        res.render("users/registro",{erros:erros})

    }else{

        user.findOne({ where: {email : req.body.email}})
        .then((u)=>{
            const us = u
            if (us) {

                req.flash("error_msg","Já existe uma conta com este email")
                res.redirect("/users/registro")

            } else if (!us){
                
                user.create({
                    nome : req.body.nome,
                    email : req.body.email,
                    senha : req.body.senha
                }).then(()=>{
                    req.flash("success_msg","Conta criada com sucesso!")
                    res.redirect("/users")
                })
                .catch(()=>{
                    req.flash("error_msg","Houve um erro, tente novamente")
                    res.redirect("/users/registro")
                })
            }

        })
        .catch((err)=>{
            console.log(err)
            req.flash("error_msg","Houve um erro interno")
            res.redirect("/users/registro")
        })
    }

})

module.exports = router