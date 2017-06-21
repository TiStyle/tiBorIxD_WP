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
        window.addEventListener('scroll', throttle(this.scrollToNextPosition.bind(this), 1400));
        
    }

    createArrowDown(){
        var element = document.createElement('div');
        element.classList.add('scroll-to-next');

        document.body.append(element);
    }

    scrollToNextPosition(){
            this.nextScrollPoints = this.scrollPointsList.find(e => e.offsetTop > this.lastScrollPos);

            if(this.nextScrollPoints){
                scrollToY(this.nextScrollPoints.offsetTop, 1500, 'easeInOutQuint');
                this.lastScrollPos = this.nextScrollPoints.offsetTop;
            } else {
                this.lastScrollPos = 0;
            }
    }
}