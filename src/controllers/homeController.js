const Login = require('../models/LoginModel');

exports.paginaInicial = (req, res) => {

  return res.render('login');
 
};
exports.home = (req, res) => {
    res.render('home')
}

exports.login = async function(req, res, next) {

    
  try{
      const login = new Login(req.body);
      await login.login();
  
  if(login.erros.length > 0){
      req.flash('error', login.erros);
      req.session.save(function(){
          return res.redirect('/cadastro/index');
      })
      return;
  }


  req.flash('Usuário Autenticado');
  req.session.user = login.user;

  req.session.save(function(){
      return res.redirect('/agenda');
  })

  }catch(e){
      res.render('404');
  }
  return
}
exports.logout = function(req, res){
req.session.destroy();
res.redirect('/login/index')
}