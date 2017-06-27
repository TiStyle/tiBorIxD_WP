class Conversation{
    constructor(){
        this.conversationButton = document.getElementById('conversationFormButton');
        this.conversationInit();

        this.questions = document.querySelectorAll('form *[data-visible]');

        this.sendForm = false;

        this.addEventListeners();

    }
    addEventListeners(){
        this.conversationButton.addEventListener('click', this.toggleMenuVisibility.bind(this));

        this.formContainer.addEventListener('click', (event)=>{
            if(this.formContainer == event.target){
                this.toggleMenuVisibility();
            }
        });


        this.form.addEventListener('keydown', (event)=>{
            var charCode = event.which || event.keyCode;
            if(charCode == 9 || charCode == 13 || charCode == 39){
                this.nextQuestion(event);
            } 
            if(charCode == 37){
                this.previousQuestion(event);
            }
            if(this.sendForm){
                this.submitForm();
            }
        });
    }

    conversationInit(){
        if(!document.getElementById('conversationForm')){
            this.formContainer = document.createElement('div');
            this.formContainer.id = 'conversationForm';
            this.formContainer.classList.add('form-container');

            this.formContainer.style.display = 'none';

            this.form = document.createElement('form');
            this.name = document.createElement('input');
            this.email = document.createElement('input');
            this.message = document.createElement('textarea');
            this.submit = document.createElement('button');
            this.submit.classList.add('primary-action');

            this.name.type = 'text';
            this.email.type = 'email';
            this.message.rows = '4';
            this.submit.type = 'submit';

            this.name.placeholder = 'What is your name?';
            this.email.placeholder = 'On what email adress can I contact you?';
            this.message.placeholder = 'Tell me, what do you want to talk about?';

            this.name.autofocus = true;

            this.name.required = true;
            this.email.required = true;
            this.message.required = true;

            this.name.dataset.visible = 'visible';
            this.email.dataset.visible = '';
            this.message.dataset.visible = '';

            this.form.append(this.name);
            this.form.append(this.email);
            this.form.append(this.message);
            this.form.append(this.submit);

            this.formContainer.append(this.form);
            document.body.append(this.formContainer);
        }
    }

    toggleMenuVisibility() {
        console.log('test');
        if (this.isVisible()) {
            this.close();
        } else {
            this.show();            
        }
    }

    isVisible() {
        return this.formContainer.style.display == '';
    }

    show(){
        this.formContainer.style.display = '';
        document.documentElement.style.overflow = 'hidden';
        document.querySelector('form input[data-visible="visible"]').focus();
    }

    close(){
        this.formContainer.style.display = 'none';
        document.documentElement.style.overflow = '';
    }

    nextQuestion(){
        const currentQuestion = event.target;
        const nextQuestion = event.target.nextSibling;

        currentQuestion.dataset.visible = "";
        currentQuestion.autofocus = false;

        if(nextQuestion.dataset.visible == ""){
            nextQuestion.dataset.visible = 'visible';
            nextQuestion.autofocus = true;
        } else {
            console.log('no more questions');
            return this.sendForm = true;
        }
    }
    previousQuestion(){
        const currentQuestion = event.target;
        const prevQuestion = event.target.previousSibling;

        currentQuestion.dataset.visible = "";
        currentQuestion.autofocus = false;

        if(prevQuestion.dataset.visible == ""){
            prevQuestion.dataset.visible = 'visible';
            prevQuestion.autofocus = true;
        } else {
            console.log('no more questions');
        }
    }

    submitForm(){
        console.log('submit');
        this.resetForm();
    }

    resetForm(){
        this.formContainer.remove();
        this.toggleMenuVisibility();
        var a = new Conversation();
    }
}