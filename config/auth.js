const localStrategy = require("passport-local").Strategy
const passport = require("passport")

//model usuario
const user = require("../models/user")

module.exports = function (passport) {
    passport.use( new localStrategy({usernameField:"email",passwordField:"senha"},(email,senha,done)=>{

        user.findOne({where:{email:email}}).then((u)=>{
            if (!u) {
                return done(null,false,{message:"Essa conta não existe"})
            }

                if (u.dataValues.senha == senha) {
                    
                    return done(null,u)
    
                } else {

                    return done(null,false,{message:"Senha incorreta"})
                }
            
        })
    }))

    passport.serializeUser((u,done)=>{
        done(null,u.dataValues.id)
    })

    passport.deserializeUser((id,done)=>{
        user.findOne({where:{id:id}}).then((u)=>{
            done(false,u)
        }).catch((error)=>{
            console.log(error)
        })
    })
}