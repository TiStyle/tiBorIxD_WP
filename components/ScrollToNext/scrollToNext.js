class ScrollToNext{
    constructor(){
        this.windowHeight = window.innerHeight;
        this.scrollArrowDownBarier = 10;
        this.updateArrowDown();

        this.lastScrollPos = 0;
        this.scrollPoints = document.querySelectorAll('.scroll-point');
        this.scrollPointsList = [];
        this.scrollPoints.forEach(scrollPoint => this.scrollPointsList.push(scrollPoint));

        this.addEventListeners();


        // this.scrollPointsList.forEach(e => console.log(e.offsetTop));
    }
    addEventListeners(){
        window.addEventListener('scroll', throttle(this.scrollToNextPosition.bind(this), 1500));
        window.addEventListener('scroll', throttle(this.updateArrowDown.bind(this), 100));
    }

    createArrowDown(){
        var element = document.createElement('div');
        element.classList.add('scroll-to-next');

        document.body.append(element);
        
        this.scroller = document.querySelector('.scroll-to-next');
        this.scroller.addEventListener('click', this.scrollToNextPosition.bind(this));
    }
    removeArrowDown(){
        document.querySelector('.scroll-to-next').remove();
    }

    updateArrowDown(){
        if(this.scrollArrowDownBarier < window.scrollY && document.querySelector('.scroll-to-next')){
            this.removeArrowDown();
        }
        if(this.scrollArrowDownBarier > window.scrollY && !document.querySelector('.scroll-to-next')){
            this.createArrowDown();
            this.scroller = document.querySelector('.scroll-to-next');
            this.scroller.addEventListener('click', this.scrollToNextPosition.bind(this));
        }
    }

    scrollToNextPosition(event){
        if(this.lastScrollPos < window.scrollY || this.lastScrollPos <= window.scrollY){
            // console.log('down');
            // console.log('Last Position: ', this.lastScrollPos);
            // console.log('Window Scroll Y: ', window.scrollY);
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop > this.lastScrollPos);
            if(this.nextScrollPoints.length){
                scrollToY(this.nextScrollPoints[0].offsetTop, 250, 'easeInOutQuint');
                this.lastScrollPos = this.nextScrollPoints[0].offsetTop;
            }
        } else {
            // console.log('up');
            // console.log('Last Position: ', this.lastScrollPos);
            // console.log('Window Scroll Y: ', window.scrollY);
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop < this.lastScrollPos);
            if(this.nextScrollPoints.length){
                scrollToY(this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop, 250, 'easeInOutQuint');
                this.lastScrollPos = this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop;
            } 
        }
    }
}