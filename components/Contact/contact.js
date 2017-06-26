class Conversation{
    constructor(){
        this.conversationButton = document.getElementById('conversationFormButton');
        this.conversationInit();

        this.questions = document.querySelectorAll('form *[data-visible]');

        this.addEventListeners();

    }
    addEventListeners(){
        this.conversationButton.addEventListener('click', this.toggleMenuVisibility.bind(this));

        this.formContainer.addEventListener('click', (event)=>{
            if(this.formContainer == event.target){
                this.toggleMenuVisibility();
            }
        });

        this.questions.forEach(question => {
            document.querySelector('form *[data-visible="visible"]').addEventListener('keydown', (event)=>{
                var charCode = event.which || event.keyCode;
                if(charCode == 9){
                    this.nextQuestion(event);
                }
            });
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

        this.nextQuestion();
    }

    close(){
        this.formContainer.style.display = 'none';
        document.documentElement.style.overflow = '';
    }

    // TABBINGS 
    nextQuestion(){
        console.log('tab');
        // console.log(event.target.nextSibling.dataset);
        event.target.dataset.visible = '';
        event.target.nextSibling.dataset.visible = 'visible';
        return;
    }
}