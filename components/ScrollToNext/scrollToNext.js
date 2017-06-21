class ScrollToNext{
    constructor(){
        this.windowHeight = window.innerHeight;
        this.createArrowDown();
        this.scroller = document.querySelector('.scroll-to-next');

        this.lastScrollPos = 0;
        this.scrollPoints = document.querySelectorAll('.scroll-point');
        this.scrollPointsList = [];
        this.scrollPoints.forEach(scrollPoint => this.scrollPointsList.push(scrollPoint));

        this.timer = null;

        this.count = 0;

        this.addEventListeners();
    }
    addEventListeners(){
        window.addEventListener('scroll', ()=>{
            this.scrollPos = window.scrollY;
            
            if(this.scrollPos > this.lastScrollPos){
                // console.log('down');
                if(this.timer !== null) {
                    clearTimeout(this.timer);        
                }
                this.timer = setTimeout( ()=> {
                    this.scrollToNextPosition(this.lastScrollPos, true, this.count);
                }, 1000);
            } else {
                // console.log('up');
                if(this.timer !== null) {
                    clearTimeout(this.timer);        
                }
                this.timer = setTimeout( ()=> {
                    this.scrollToNextPosition(this.lastScrollPos, false, this.count);
                }, 1000);
            }        
            this.lastScrollPos = this.scrollPos;
        });
    }

    createArrowDown(){
        var element = document.createElement('div');
        element.classList.add('scroll-to-next');

        document.body.append(element);
    }

    scrollToNextPosition(pos, bool){
        this.count++;
        console.log('Count: ', this.count + 'Down: ', bool);
        if(bool){
            const nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop > pos);

            if(nextScrollPoints.length){
                scrollToY(nextScrollPoints[0].offsetTop, 1500, 'easeInOutQuint');
                this.scrollPos = nextScrollPoints[0].offsetTop;
                return;
            }
        } else {
            const nextScrollPoints = this.scrollPointsList.filter(e => e.offsetTop < pos);

            if(nextScrollPoints.length){
                scrollToY(nextScrollPoints[0].offsetTop, 1500, 'easeInOutQuint');
                this.scrollPos = nextScrollPoints[0].offsetTop;
                return;
            }
        }
        return;
    }
}