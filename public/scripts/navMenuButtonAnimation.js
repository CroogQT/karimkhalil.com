const navMenuButtonElement = document.getElementById('navMenuButton');
const mobileNavMenuelement = document.getElementById('mobileNavMenu');

navMenuButtonElement.addEventListener('click', function(){

    this.classList.toggle('opened');
    mobileNavMenuelement.classList.toggle('opened');

})