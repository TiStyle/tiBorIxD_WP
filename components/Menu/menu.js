class Menu {
    constructor() {
        this.createHamburger();
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


    createHamburger() {
        // <div id="menu-icon" class="menu-icon right"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div>
        var icon = document.createElement('div');
        icon.id = 'menu-icon';
        icon.classList.add('menu-icon');

        var bar1 = document.createElement('div');
        var bar2 = document.createElement('div');
        var bar3 = document.createElement('div');
        bar1.classList.add('bar1');
        bar2.classList.add('bar2');
        bar3.classList.add('bar3');

        icon.append(bar1);
        icon.append(bar2);
        icon.append(bar3);

        document.querySelector('.menu-primary-container').appendChild(icon);
    }

// TODO: refactor naar eigen Component
    createOverlay() {
        var overlay = document.createElement('div');
        overlay.className = 'overlay';  
        document.body.appendChild(overlay);
        document.body.querySelector('.overlay').addEventListener('click', this.toggleMenuVisibility.bind(this));
        document.documentElement.style.overflow = 'hidden';
    }

    removeOverlay() {
        document.body.querySelector('.overlay').remove();
        document.documentElement.style.overflow = '';
    }
}