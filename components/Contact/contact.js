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

        this.submit.addEventListener('click', this.checkIfRequered.bind(this));

        // this.nextButton.addEventListener('click', this.nextQuestion.bind(this, true));
        // this.previousButton.addEventListener('click', this.previousQuestion.bind(this, true));

        // this.form.addEventListener('keydown', (event)=>{
        //     var charCode = event.which || event.keyCode;
        //     if(charCode == 9 || charCode == 13){
        //         this.nextQuestion(event);
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

            // this.buttonContainer = document.createElement('div');
            // this.buttonContainer.classList.add('button-container');
            // this.previousButton = document.createElement('input');
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

            this.form.append(this.name);
            this.form.append(this.email);
            this.form.append(this.message);
            
            // this.buttonContainer.append(this.previousButton);
            // this.buttonContainer.append(this.nextButton);

            // this.form.append(this.buttonContainer);
            
            this.form.append(this.submit);

            this.formContainer.insertAdjacentHTML('afterBegin', closeIcon());
            this.formContainer.append(this.form);
            document.body.append(this.formContainer);

            document.querySelector('.close-icon').classList.add('center');
            document.querySelector('.close-icon').addEventListener('click', this.resetForm.bind(this));
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
        this.name.focus();
    }

    close(){
        this.formContainer.style.display = 'none';
        this.formContainer.classList.remove('appear');
        document.documentElement.style.overflow = '';
    }

    // nextQuestion(buttonPressed){
    //     if(buttonPressed){
    //         var currentQuestion = document.querySelector('input[data-visible=\'visible\']') || document.querySelector('textarea[data-visible=\'visible\']');
    //         var nextQuestion = currentQuestion.nextSibling;
    //     } else {
    //         var currentQuestion = event.target;
    //         var nextQuestion = event.target.nextSibling;
    //     }

    //     if(currentQuestion.value != ''){
    //         console.log('not empty');
            
    //         currentQuestion.dataset.visible = "";
    //         currentQuestion.autofocus = false;
    //         currentQuestion.classList.remove('error');            

    //         if(nextQuestion.dataset.visible == ""){
    //             nextQuestion.dataset.visible = 'visible';
    //             nextQuestion.autofocus = true;
    //             console.log(nextQuestion.nextSibling)
    //             if( nextQuestion.nextSibling == document.querySelector('.button-container') ){
    //                 console.log('Last questions');
    //                 this.nextButton.classList.add('hide');
    //             }
    //         } else {
    //             console.log('no more questions');
    //             return this.sendForm = true;
    //         }
    //     } else {
    //         console.log('empty');
    //         if(!currentQuestion.classList.contains('error')){
    //             currentQuestion.classList.add('error');
    //             currentQuestion.focus();
    //             this.replacePlaceholder(currentQuestion.id);
    //             currentQuestion.placeholder = this.placeholderText;
    //         } else {
    //             return;
    //         }
    //     }
    // }

    replacePlaceholder(questionId){
        this.placeholderText = '';

        switch(questionId){
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

    checkIfRequered(){
        Array.from(document.querySelectorAll('form >*[required]'))
            .forEach(field => {
                if(field.value === ''){
                    this.replacePlaceholder(field.id);
                    field.classList.add('error');
                    field.placeholder = this.placeholderText;
                } else {
                    field.classList.remove('error');
                }
            });
    }

    // previousQuestion(buttonPressed){
    //     if(buttonPressed){
    //         var currentQuestion = document.querySelector('input[data-visible=\'visible\']') || document.querySelector('textarea[data-visible=\'visible\']');
    //         var prevQuestion = currentQuestion.previousSibling;
    //         console.log(currentQuestion);
    //         console.log(prevQuestion);
    //     } else {
    //         var currentQuestion = event.target;
    //         var prevQuestion = event.target.previousSibling;
    //     }

    //     currentQuestion.dataset.visible = "";
    //     currentQuestion.autofocus = false;

    //     if(prevQuestion.dataset.visible === ""){
    //         console.log('not null');
    //         prevQuestion.dataset.visible = 'visible';
    //         prevQuestion.autofocus = true;
    //         prevQuestion.focus();
    //     } else {
    //         console.log('first question');
    //         currentQuestion.dataset.visible = "visible";
    //         currentQuestion.autofocus = true;
    //     }
    // }

    // submitForm(){
    //     console.log('submit');
    //     this.resetForm();
    // }

    resetForm(){
        this.formContainer.remove();
        this.toggleMenuVisibility();
        var a = new Conversation();
    }
}