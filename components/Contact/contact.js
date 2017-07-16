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


        // TODO: Next + Previous question functionality

        // this.nextButton.addEventListener('click', this.nextQuestion.bind(this));


        // this.form.addEventListener('keydown', (event)=>{
        //     var charCode = event.which || event.keyCode;
        //     if(charCode == 9 || charCode == 13 || charCode == 39){
        //         this.nextQuestion(event);
        //     } 
        //     if(charCode == 37){
        //         this.previousQuestion(event);
        //     }
        //     if(this.sendForm){
        //         this.submitForm();
        //     }
        // });
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
            this.previousButton = document.createElement('input');
            // this.previousButton.classList.add('hide');
            // this.nextButton = document.createElement('input');
            this.submit = document.createElement('input');
            this.submit.classList.add('secondary-action');

            this.form.method = "POST";
            this.form.name = "contactform";
            this.form.action = "wp-content/themes/tiBorIxD_WP/contact-form-handler.php";

            this.name.type = 'text';
            this.name.name = 'name';
            this.email.type = 'text';
            this.email.name = 'email';
            this.message.rows = '2';
            this.message.name = 'message';
            // this.previousButton.type = 'button';
            // this.nextButton.type = 'button';
            this.submit.type = 'submit';

            this.name.placeholder = 'What is your name?';
            this.name.id = 'name';
            this.email.placeholder = 'On what email adress can I contact you?';
            this.email.id = 'email';
            this.message.placeholder = 'Tell me, what do you want to talk about?';
            this.message.id = 'message';
            // this.previousButton.value = '<';
            // this.nextButton.value = '>';
            this.submit.value = 'Send message';

            this.name.autofocus = true;

            this.name.required = true;
            this.email.required = true;
            this.message.required = true;

            // this.name.dataset.visible = 'visible';
            // this.email.dataset.visible = '';
            // this.message.dataset.visible = '';

            this.form.insertAdjacentHTML('afterBegin', closeIcon());
            this.form.append(this.name);
            this.form.append(this.email);
            this.form.append(this.message);
            // this.form.append(this.previousButton);
            // this.form.append(this.nextButton);
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
        this.formContainer.classList.add('appear');
        document.documentElement.style.overflow = 'hidden';
        document.querySelector('form input[data-visible="visible"]').focus();
    }

    close(){
        this.formContainer.style.display = 'none';
        this.formContainer.classList.remove('appear');
        document.documentElement.style.overflow = '';
    }

    nextQuestion(){
        console.log(event);
        const currentQuestion = event.target;
        const nextQuestion = event.target.nextSibling;

        if(currentQuestion.value != ''){
            console.log('not empty');
            
            currentQuestion.dataset.visible = "";
            currentQuestion.autofocus = false;
            currentQuestion.classList.remove('error');            

            if(nextQuestion.dataset.visible == ""){
                nextQuestion.dataset.visible = 'visible';
                nextQuestion.autofocus = true;
            } else {
                console.log('no more questions');
                return this.sendForm = true;
            }
        } else {
            console.log('empty');
            currentQuestion.classList.add('error');
            currentQuestion.focus();
            this.replacePlaceholder();
            currentQuestion.placeholder = this.placeholderText;
        }
    }

    replacePlaceholder(){
        this.placeholderText = '';

        switch(event.target.id){
            case 'name':
                this.placeholderText = 'I would love to know your name...';
            break;
            case 'email':
                this.placeholderText = 'I could try telepathy, an email would be easier...';
            break;
            case 'message':
                this.placeholderText = 'Don\'t be shy, tell me your secrets.. Or you can just share what you want to talk about... ';
            break;
        }

        return this.placeholderText;
    }

    previousQuestion(){
        const currentQuestion = event.target;
        const prevQuestion = event.target.previousSibling;

        currentQuestion.dataset.visible = "";
        currentQuestion.autofocus = false;

        if(prevQuestion != null){
            console.log('not null');
            prevQuestion.dataset.visible = 'visible';
            prevQuestion.autofocus = true;
            prevQuestion.focus();
        } else {
            console.log('first question');
            currentQuestion.dataset.visible = "visible";
            currentQuestion.autofocus = true;
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