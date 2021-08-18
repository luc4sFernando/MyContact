const listaDeContatos = require('../models/SearchId')
exports.agenda = async (req, res) =>{
    if(!req.session.user){
      req.flash('error', 'Você precisa fazer login')
      return res.redirect('/')
      }
      const contatos = await listaDeContatos.buscaContatos();
      res.render('notes', {contatos})
}