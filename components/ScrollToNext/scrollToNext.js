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
        this.scrollToNextBlockFN = throttle(this.scrollToNextBlock.bind(this), 1500);
        window.addEventListener('scroll', this.scrollToNextBlockFN);
        window.addEventListener('scroll', throttle(this.updateArrowDown.bind(this), 100));
    }

    createArrowDown(){
        var element = document.createElement('div');
        element.classList.add('scroll-to-next');

        document.body.append(element);
        
        this.scroller = document.querySelector('.scroll-to-next');
        this.scroller.addEventListener('click', this.scrollToNextBlock.bind(this));
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
            this.scroller.addEventListener('click', this.scrollToNextBlock.bind(this));
        }
    }

    scrollToNextBlock(){
        console.log(this.lastScrollPos)

        if(this.lastScrollPos < window.scrollY){
            // console.log('down');
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop > this.lastScrollPos);
            if(this.nextScrollPoints.length){

                document.body.style.overflow = 'hidden'
                window.removeEventListener('scroll', this.scrollToNextBlockFN);
                
                scrollToY(this.nextScrollPoints[0].offsetTop, 250, 'easeInOutSine', ()=>{
                    this.lastScrollPos = this.nextScrollPoints[0].offsetTop;
                    window.addEventListener('scroll', this.scrollToNextBlockFN)
                    document.body.style.overflow = ''
                });
            }
        } 
        if(this.lastScrollPos > window.scrollY){
            // console.log('up');
            this.nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop < this.lastScrollPos);
            if(this.nextScrollPoints.length){
                
                document.body.style.overflow = 'hidden'
                window.removeEventListener('scroll', this.scrollToNextBlockFN);
                
                scrollToY(this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop, 250, 'easeInOutSine', ()=>{
                    this.lastScrollPos = this.nextScrollPoints[this.nextScrollPoints.length - 1].offsetTop;
                    window.addEventListener('scroll', this.scrollToNextBlockFN)
                    document.body.style.overflow = ''
                });
            } 
        }
    }

    scrollToPosition(){
        // const nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop > this.lastScrollPos);
        // console.log(this.scrollPointsList);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(entry.intersectionRatio > 0 && entry.intersectionRatio < 0.8){
                        console.log(entry.target.offsetTop);

                        scrollToY(entry.target.offsetTop, 250, 'easeInOutQuint');
                        // this.createTempOverlay();
                        
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

    createTempOverlay(){
        if(!document.querySelector('temp-overlay')){
            document.body.classList.add('temp-overlay');
            document.body.style.overflow = 'hidden';
        } else{
            document.body.classList.remove('temp-overlay');
            document.body.style.overflow = '';
        }
    }
}