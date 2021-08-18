const ContatoModel = require('./ContatoModel');

const validator = require('validator');

class EditId{

    constructor(body, id){
        this.id = id;
        this.body = body;
        this.erros = [];
        this.contato = null;
    }

    async editContact() {

        this.valida();

        if (this.erros.length > 0) return;

        this.contato = await ContatoModel.ContatoModel.findByIdAndUpdate(this.id, this.body, {new: true})
        
        
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
    }}

    module.exports = EditId