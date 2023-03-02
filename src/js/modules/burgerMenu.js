const burgerMenu = (triggerSelector ,menuSelector) => {
    const btn = document.querySelector(triggerSelector);
    const menu = document.querySelector(menuSelector);
    let menuHidden = true;

    menu.classList.add('animated', 'fadeOutUp');

    function showMenu() {
        menu.classList.toggle('fadeInDown');
        menu.classList.toggle('fadeOutUp');

        if (menuHidden === true) {
            menu.style.display = "block";
            menuHidden = false;
        } else {
            setTimeout(() => menu.style.display = "none", 350);
            menuHidden = true;
        }
    }

    function animateBtn() {
        if (window.innerWidth < 993) {
            btn.addEventListener('click', showMenu);
        } else {
            menu.style.display = "none";
            btn.removeEventListener('click', showMenu);
        }
    }

    animateBtn();  
    window.addEventListener('resize', animateBtn);  
};

export default burgerMenu;