const validator = require('validator')
export default class ValidaLogin{

    constructor(classe){

        this.form = document.querySelector(classe);
        // this.modalWrapper = document.querySelector('.modal-wrapper');

    }
    init(){
       
        this.evento();
    }
    evento(){
            this.form.addEventListener('submit', e =>{
            e.preventDefault();
            const email = document.querySelector('input[name="email"]').value
            const senha = document.querySelector('input[name="senha"]').value;
            
            console.log(email, senha)
            this.valida(e, email, senha)
        })
    }
  valida(e, email, senha){
    const el = e.target;
    let error = false;
    if(!validator.isEmail(email)){
       error = true;
    const modal = document.querySelector('.modal-wrapper')
        this.modalOn(modal)
       
    }
    if(senha.length < 3 || senha.length > 50){
        error = true;
        const modal = document.querySelector('.modal-wrapper')
            this.modalOn(modal)
           
    }
    if(error == false){
        console.log(error)
        el.submit()
    }
  }

  modalOn(modal){
      
      modal.classList.add('mostrar');
      const button = document.querySelector('.btn-exit')
      button.addEventListener('click',() =>{
          modal.classList.remove('mostrar')
       
      })
      
  }
    
}