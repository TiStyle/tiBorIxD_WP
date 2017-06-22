class ScrollToNext{
    constructor(){
        this.windowHeight = window.innerHeight;
        this.createArrowDown();
        this.scroller = document.querySelector('.scroll-to-next');

        this.lastScrollPos = 0;
        this.scrollPoints = document.querySelectorAll('.scroll-point');
        this.scrollPointsList = [];
        this.scrollPoints.forEach(scrollPoint => this.scrollPointsList.push(scrollPoint));

        this.addEventListeners();
    }
    addEventListeners(){
        this.scroller.addEventListener('click', this.scrollToNextPosition.bind(this));
        window.addEventListener('scroll', throttle(this.scrollToNextPosition.bind(this), 1700));
        
    }

    createArrowDown(){
        var element = document.createElement('div');
        element.classList.add('scroll-to-next');

        document.body.append(element);
    }

    scrollToNextPosition(){
        if(this.lastScrollPos < window.scrollY){
            console.log('down');
            console.log('Last Position: ', this.lastScrollPos);
            console.log('Window Scroll Y: ', window.scrollY);
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop > this.lastScrollPos);
            if(this.nextScrollPoints.length){
                scrollToY(this.nextScrollPoints[0].offsetTop, 250, 'easeInOutQuint');
                this.lastScrollPos = this.nextScrollPoints[0].offsetTop;
            }
        } else {
            console.log('up');
            console.log('Last Position: ', this.lastScrollPos);
            console.log('Window Scroll Y: ', window.scrollY);
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop < this.lastScrollPos);
            if(this.nextScrollPoints.length){
                scrollToY(this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop, 250, 'easeInOutQuint');
                this.lastScrollPos = this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop;
            } 
        }
    }
}