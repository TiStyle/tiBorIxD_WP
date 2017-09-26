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


    }
    addEventListeners(){
        window.addEventListener('scroll', throttle(this.scrollToPosition.bind(this), 1000));
        // window.addEventListener('scroll', throttle(this.scrollToNextPosition.bind(this), 1800));
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
        if(this.lastScrollPos <= window.scrollY){
            // console.log('down');
            // console.log('Last Position: ', this.lastScrollPos);
            // console.log('Window Scroll Y: ', window.scrollY);
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop > this.lastScrollPos);
            if(this.nextScrollPoints.length){
                console.log(this.nextScrollPoints[0].offsetTop)
                // scrollToY(this.nextScrollPoints[0].offsetTop, 250, 'easeInOutQuint');
                this.lastScrollPos = this.nextScrollPoints[0].offsetTop;
            }
        } else {
            // console.log('up');
            // console.log('Last Position: ', this.lastScrollPos);
            // console.log('Window Scroll Y: ', window.scrollY);
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop < this.lastScrollPos);
            if(this.nextScrollPoints.length){
                console.log(this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop)
                // scrollToY(this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop, 250, 'easeInOutQuint');
                this.lastScrollPos = this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop;
            } 
        }
    }

    scrollToPosition(){
        // const nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop > this.lastScrollPos);
        // console.log(this.scrollPointsList);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(entry.intersectionRatio > 0 && entry.intersectionRatio < 0.5){
                        console.log(entry.target.offsetTop);
                        scrollToY(entry.target.offsetTop, 250, 'easeInOutQuint');
                    }
                    // scrollToY(entry.target.nextElementSibling, 250, 'easeInOutQuint')
                }
                // console.log(entry)
            })
        })

        this.scrollPointsList.forEach(scrollPoint => {
            observer.observe(scrollPoint);
        })
    }
}