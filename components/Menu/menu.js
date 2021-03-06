﻿// Overall OPSCHONEN

class Menu {
    constructor() {
        this.currentMenuElement = document.querySelector('.current-menu-item');
        if(this.currentMenuElement != null){
            this.rect = this.currentMenuElement.getBoundingClientRect();
        } else{
            this.currentMenuElement = document.querySelector('.menu-item-home');
            this.rect = this.currentMenuElement.getBoundingClientRect();
        }
        this.createCurrentMenuIcon(this.rect.top, this.rect.height);
        this.currentMenuIcon = document.querySelector('.hexagon-container');

        this.createHamburger();
        this.hamburger = document.getElementById('menu-icon');
        this.menu = document.getElementById('menu');
        this.addEventListeners();

        this.headerClickOpensMenu = false;
    }
    
    addEventListeners() {
        this.hamburger.addEventListener('click', this.toggleMenuVisibility.bind(this));

        Array.from(document.querySelectorAll('.menu-item')).forEach(menuItem => {
            menuItem.addEventListener('mouseenter', function(element){
                var currentSelectedPos = parseInt(document.querySelector('.hexagon-container').style.top);
                var selectedMenuPos = element.target.getBoundingClientRect();
                var updatedSelectedPos = selectedMenuPos.top - selectedMenuPos.height - 16;

                if( currentSelectedPos > updatedSelectedPos ){
                    updatedSelectedPos = currentSelectedPos - updatedSelectedPos;
                    document.querySelector('.hexagon-container').style.transform = 'scale(0.3) translateY(-' + updatedSelectedPos * 3.3 + 'px)';
                } else {
                    updatedSelectedPos = updatedSelectedPos - currentSelectedPos;
                    document.querySelector('.hexagon-container').style.transform = 'scale(0.3) translateY(' + updatedSelectedPos * 3.3 + 'px)';
                }
            });
        });

        window.addEventListener('resize',this.bindMenuOpener.bind(this));
        this.bindMenuOpener();
        
        window.addEventListener("resize", this.updatePositionCurrentMenuIcon.bind(this));
        this.menu.addEventListener("transitionend", this.updatePositionCurrentMenuIcon.bind(this, true), false);
    }

    bindMenuOpener() {
        document.querySelector("header")
            .removeEventListener('click', this.toggleMenuVisibility)
        this.headerClickOpensMenu = false;
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


//TODO: Refactor create icon functions
    createHamburger() {
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

    createCurrentMenuIcon(rectTop, rectHeight) {
        var container = document.createElement('div');
        container.classList.add('hexagon-container');
        container.style.top = (rectTop - rectHeight - 16) + 'px';

        var skew1 = document.createElement('div');
        var skew2 = document.createElement('div');
        var skew3 = document.createElement('div');
        skew1.classList.add('skew1');
        skew2.classList.add('skew2');
        skew3.classList.add('skew3');

        container.append(skew1);
        container.append(skew2);
        container.append(skew3);

        document.querySelector('.menu-primary-container').append(container);
    }
    
    updatePositionCurrentMenuIcon(firesOnes, event) {
        if(event){
            if(event.target != this.menu){
                return;
            }
        } 
        if(firesOnes){
            this.currentMenuIcon.classList.add('appear');
        }
        var updatePos = this.currentMenuElement.getBoundingClientRect();        
        this.currentMenuIcon.style.top = (updatePos.top - updatePos.height - 16) + 'px';
        
        if((updatePos.top - updatePos.height) < 0){
            this.currentMenuIcon.classList.remove('appear');
        }
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