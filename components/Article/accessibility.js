class Accessibility{
    constructor(){
        this.accChecker = Array.from(document.querySelectorAll('#accessibilityCheck input'));
        this.article = document.querySelector('article.post');
        
        this.addEventListeners();
    }

    addEventListeners(){
        this.accChecker.forEach(item => item.addEventListener('click', () => {
                console.log(this.article.className)
            if(!this.article.classList.contains(item.value)){
                this.article.className = 'post';
            } 
            this.article.classList.add(item.value);
        }));
    }
}