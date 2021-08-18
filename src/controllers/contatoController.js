const Contato = require('../models/ContatoModel')
const SearchId = require('../models/SearchId')


exports.cadastrarContato = (req, res) => {
  if(!req.session.user){
    req.flash('error', 'Você precisa fazer login')
  return res.redirect('/')
  }
  return res.render('contato', {contato: {}});
};

// ROTA POST, REGISTRA O CONTATO NO DB

exports.register = async (req, res) => {

  try{

    const cadastro = new Contato.Contato(req.body);
    await cadastro.register();

    if(cadastro.erros.length > 0){
      
      req.flash('error', cadastro.erros);
      req.session.save(function(){
         res.redirect('/contato/index');
      })
      return
  }
  req.flash('success', 'Novo contato cadastrado')
  req.session.save(function(){
    res.redirect('/agenda')
  })
  }catch(e){
    
    res.render('404')
  }
    

}

exports.userIndex = async function(req, res) {
if(!req.params.id) return res.render('404');
const contato = await SearchId.searchID(req.params.id)
if(!contato) return res.render('404');
console.log(contato, req.params.id)
return res.render('contato', {contato})
}

exports.alteraContato = async function(req, res, next) {

  try{
    const contato = new Contato.Contato(req.body);
    await contato.alteraContato(req.params.id);
    if(contato.erros.length > 0){
      
      req.flash('error', contato.erros);
      req.session.save(function(){
         res.redirect('/contato/index');
      })
      return
  }
  req.flash('success', 'contato alterado')
  req.session.save(function(){
    console.log(contato.contato.id)
    res.redirect(`/contato/index/${contato.contato.id}`)
  })
  }catch(e){
    console.log(e)
    res.render('404')
  }
  

}
exports.listaContatos = async function(req, res, next){

  const contatos = await SearchId.buscaContatos();
  // if(!typeof contatos == 'string') return req.flash('error', 'nao conseguir achar seus contatos no db')
  // if(contatos == ""){ return req.flash('error', 'não a contatos')}
  res.render('notes', {contatos})
}
exports.deleteContato = async (req, res) =>{

  const contato = new Contato.Contato(req.body);
  await contato.delete(req.params.id);
  res.redirect('/agenda')

  return
}