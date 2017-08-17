class Accessibility{
    constructor(){
        this.accChecker = Array.from(document.querySelectorAll('#accessibilityCheck input'));
        this.article = document.querySelector('article#post');
        this.articleClass = document.querySelector('article#post').className;
        
        this.addEventListeners();
    }

    addEventListeners(){
        this.accChecker.forEach(item => item.addEventListener('click', () => {
            if(!this.article.classList.contains(item.value)){
                this.article.className = this.articleClass;
            } 
            this.article.classList.add(item.value);
        }));
    }
}