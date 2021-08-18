const ContatoModel = require('./ContatoModel');

exports.searchID = async (id) => {
 if(!typeof id === 'string') return;

const user = await ContatoModel.ContatoModel.findById(id)
return user

}

exports.buscaContatos = async ()=>{

    const contatos = await ContatoModel.ContatoModel.find().sort({ordem :-1})
    return contatos
}