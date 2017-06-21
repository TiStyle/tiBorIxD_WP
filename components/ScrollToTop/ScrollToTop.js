class ScrollToTop {
    constructor(scollPosition) {
        this.buttonId = 'go-to-top';
        this.scrollHeight = scollPosition || 200;

        if (!window.scrollToTopInitiated) {
            window.addEventListener('scroll', this.checkTopOffset.bind(this));
            window.scrollToTopInitiated = true;
        }
    }

    checkTopOffset() {
        var offsetWindowTop = window.pageYOffset;

        var goToTopElement = document.getElementById(this.buttonId);

        if (offsetWindowTop > this.scrollHeight && !goToTopElement) {
            this.addGoToTopButton();
        } else if (offsetWindowTop <= this.scrollHeight && goToTopElement && !goToTopElement.classList.contains('fade-out')) {
            goToTopElement.classList.remove('appear');
            goToTopElement.classList.add('fade-out');
            goToTopElement.classList.remove('shadow-z3');
            goToTopElement.remove();
        }
    }

    addGoToTopButton() {
        var goToTopElement = document.createElement('button');
        goToTopElement.id = this.buttonId;
        goToTopElement.classList.add('appear');
        goToTopElement.classList.add('shadow-z3');

        goToTopElement.innerHTML = '' +
        '<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">' +
        '<path d="M0 0h24v24H0V0z" fill="none"></path>' +
        '<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>' +
        '</svg>';

        document.body.append(goToTopElement);

        goToTopElement.addEventListener('click', () => scrollToY(0, 1500, 'easeInOutQuint'));
    }
}