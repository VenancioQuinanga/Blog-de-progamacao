module.exports = {
    isAdmin: (req,res,next)=>{
        if (req.isAuthenticated()) {
            //return next()
        }

        req.flash("error_msg","Faça login primeiro")
        res.redirect("/")
    }
}