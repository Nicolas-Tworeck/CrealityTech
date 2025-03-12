
//transição imagens
function showImagesInSequence() {
    const text = document.getElementById('text-container-inicio');
    const buttonDown = document.getElementById('button-down-more');
    const graphic = document.getElementById('img-filo');
    const textFilo = document.getElementById('text-filo');
    const titleFilo = document.getElementById('title-filo');
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    setTimeout(() => {
        titleFilo.style.opacity = 1;
    }, 3200);
    setTimeout(() => {
        textFilo.style.opacity = 1;
    }, 1700);
    setTimeout(() => {
        graphic.style.opacity = 1;
    }, 2200);
    setTimeout(() => {
        buttonDown.style.opacity = 1;
    }, 2700);
    setTimeout(() => {
        text.style.opacity = 1;
    }, 300);
    setTimeout(() => {
        img2.style.opacity = 1;
    }, 500);

    setTimeout(() => {
        img1.style.opacity = 1;
    }, 1000);

    setTimeout(() => {
        img3.style.opacity = 1;
    }, 1500); 
}

window.onload = showImagesInSequence;



//aparece quando aparece na tela
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.8 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
});

//animação slide
document.addEventListener("DOMContentLoaded", function(){
    const elements = document.querySelectorAll('#container-slide');
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.9
    };
    const observerCallback = (entries, observe) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observe.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elements.forEach(element => {
        observer.observe(element);
    });
});

//animação serviços
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('#servico1, #servico2, #servico3, #servico4, #servico5');
    const observerOptions = {
        root:null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observerCallback = (entries, observe) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(entry.target.id === 'servico1'){
                    setTimeout(() =>{
                        entry.target.classList.add('visible');
                    },300);
                }else if(entry.target.id === 'servico2'){
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    },600);
                }else if(entry.target.id === 'servico3'){
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    },900);
                }else if(entry.target.id === 'servico4'){
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    },1200);
                }else if(entry.target.id === 'servico5'){
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    },1500);
                }
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elements.forEach(element =>{
        observer.observe(element);
    });
});

//animação criativo
document.addEventListener("DOMContentLoaded", function(){
    const elements = document.querySelectorAll('#number1, #number2, #number3');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(entry.target.id === 'number1'){
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    },300);
                }else if(entry.target.id === 'number2'){
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    },800);
                }else if(entry.target.id === 'number3'){
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    },1300);
                }
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
});






//button return nav
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const upButton = document.querySelector('.up');

    const navbarRect = navbar.getBoundingClientRect();
    const isNavbarVisible = navbarRect.bottom > 0;

    if (isNavbarVisible) {
        upButton.classList.remove('visible');
    } else {
        upButton.classList.add('visible');
    }
});