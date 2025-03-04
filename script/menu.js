const hamburger = document.querySelector('.hamburger');
const menuMobile = document.querySelector('.menu-mobile');

hamburger.addEventListener('click', () => {
    menuMobile.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    const isClickInsideMenu = menuMobile.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && menuMobile.classList.contains('active')) {
        menuMobile.classList.remove('active');
    }
});