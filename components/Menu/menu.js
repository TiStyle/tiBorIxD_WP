class Menu {
    constructor() {
        this.hamburger = document.getElementById('menu-icon');
        this.menu = document.getElementById('menu');
        this.addEventListeners();

        this.headerClickOpensMenu = false;
    }
    
    addEventListeners() {
        this.hamburger.addEventListener('click', this.toggleMenuVisibility.bind(this));

        Array.from(this.menu.querySelectorAll("li:not(.profile-mobile)")).forEach(listitem => {
            listitem.addEventListener('click', this.toggleMenuVisibility.bind(this));
        });

        window.addEventListener('resize',this.bindMenuOpener.bind(this));
        this.bindMenuOpener();
    }

    bindMenuOpener() {
        // if (window.innerWidth <= 600 && !this.headerClickOpensMenu && document.querySelector("header")) {
            // document.querySelector("header")
            //     .addEventListener('click', this.toggleMenuVisibility.bind(this))

            // this.headerClickOpensMenu = true;
        // }
      
        // if (window.innerWidth > 600 && this.headerClickOpensMenu) {
            document.querySelector("header")
                .removeEventListener('click', this.toggleMenuVisibility)
            this.headerClickOpensMenu = false;
        // }
    }

    toggleMenuVisibility() {
        if (this.isVisible()) {
            this.close();
        } else {
            this.open();
        }
    }

    isVisible() {
        return this.menu.classList.contains('open');
    }
    
    open() {
        this.menu.classList.add('open');
        this.createOverlay();
    }

    close() {
        this.menu.classList.remove('open');
        this.removeOverlay();
    }

    createOverlay() {
        var overlay = document.createElement('div');
        overlay.className = 'overlay';  
        document.body.appendChild(overlay);
        document.body.querySelector('.overlay').addEventListener('click', this.toggleMenuVisibility.bind(this));
    }

    removeOverlay() {
        document.body.querySelector('.overlay').remove();
    }
}