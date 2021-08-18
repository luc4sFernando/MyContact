const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcrypt');
const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async login() {
        
        this.valida();

        if (this.erros.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.erros.push('Usuário não cadastrado');
            return
        }

        if (!bcrypt.compareSync(this.body.senha, this.user.senha)) {
            this.erros.push('Senha Inválida');
          
            return;
        }
        
    }

    async register() {
        this.valida();
        if (this.erros.length > 0) return;
        await this.checkUser();
        if (this.erros.length > 0) return;
        const salt = bcrypt.genSaltSync();
        this.body.senha = bcrypt.hashSync(this.body.senha, salt);
        this.user = await LoginModel.create(this.body);
    }



    async checkUser() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) { this.erros.push('Email cadastrado, por favor tente outro!') }
    }
    valida() {

        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.erros.push('Email inválido');

        if (this.body.senha.length <= 3 || this.body.senha.length > 50) this.erros.push('A senha precisa ter mais de 3 caracteres');

    }


    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] != 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }
}

module.exports = Login;
