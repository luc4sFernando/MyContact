const Login = require('../models/LoginModel')

exports.cadastroPage = function(req, res, next) {
    res.render('cadastro')
}

exports.createUser = async function(req, res, next) {
    
    try{
        const login = new Login(req.body);
        await login.register();
    
    if(login.erros.length > 0){
        req.flash('error', login.erros)
        req.session.save(function(){
            return res.redirect('/cadastro/index')
        })
        return
    }


    req.flash('success', 'User registered successfully')
    req.session.save(function(){
        return res.redirect('/login/index')
    })
    }catch(e){
        
        res.render('404')
    }
    return res.send(login.erros);
}