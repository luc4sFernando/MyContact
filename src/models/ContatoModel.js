const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    tel: { type: String, required: false, default: '' },
    date: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '', }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {

    constructor(body) {
        this.body = body;
        this.erros = [];
        this.contato = null;
        
    }

    async delete(id){
        if(!typeof id == 'string') return;
        this.contato = await ContatoModel.findOneAndDelete({_id: id})
    }
    async register() {

        this.valida();

        if (this.erros.length > 0) return;

        this.contato = await ContatoModel.create(this.body);
      

    }

    async alteraContato(id){
    this.valida();
    if (this.erros.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
    }


    valida() {

        this.cleanUp();
        if (!this.body.nome) this.erros.push('Nome é um campo obrigatório');
        if (!this.body.email && !this.body.tel) this.erros.push('E necessário registrar um contato');
        if (this.body.email && !validator.isEmail(this.body.email)) this.erros.push('Email inválido, por favor cadastre um email válido');

    }


    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] != 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            tel: this.body.tel,
            date: this.body.date,
            email: this.body.email
        }
    }
}
module.exports = {Contato, ContatoModel};

