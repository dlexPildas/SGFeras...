module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg', 'Você precisa logar no sistema para acessar aquela tela!')
            res.redirect('/')
        }
    }
}