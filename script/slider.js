let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = 3;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slidesContainer = document.querySelector('.slides');

// Função para atualizar a posição do slider
function updateSlider() {
    const offset = -currentSlide * 100; // Move o slider para a esquerda
    slidesContainer.style.transform = `translateX(${offset}%)`;
}

// Avança para o próximo slide
function nextSlide() {
    currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
    updateSlider();
}

// Retrocede para o slide anterior
function prevSlide() {
    currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
    updateSlider();
}

// Event listeners para os botões de navegação
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Avança automaticamente a cada 5 segundos


// Variáveis para detectar o gesto de arrasto (swipe)
let startX = 0;
let isDragging = false;

// Eventos para dispositivos touch
slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slidesContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 50) { // Define uma sensibilidade para o gesto
        if (diffX > 0) {
            nextSlide(); // Arrastou para a esquerda
        } else {
            prevSlide(); // Arrastou para a direita
        }
        isDragging = false;
    }
});

slidesContainer.addEventListener('touchend', () => {
    isDragging = false;
});

// Eventos para mouse
slidesContainer.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
});

slidesContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diffX = startX - currentX;
    if (Math.abs(diffX) > 50) { // Define uma sensibilidade para o gesto
        if (diffX > 0) {
            nextSlide(); // Arrastou para a esquerda
        } else {
            prevSlide(); // Arrastou para a direita
        }
        isDragging = false;
    }
});

slidesContainer.addEventListener('mouseup', () => {
    isDragging = false;
});

slidesContainer.addEventListener('mouseleave', () => {
    isDragging = false;
});





document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider'); // Seleciona todos os sliders

    sliders.forEach((slider, index) => {
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;
        let currentIndex = 0;

        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');
        const slidesContainer = slider.querySelector('.slides');

        // Função para atualizar a posição do slider
        function updateSliderPosition() {
            const offset = -currentIndex * 100; // Move o slider para a esquerda
            slidesContainer.style.transform = `translateX(${offset}%)`;
        }

        // Avança para o próximo slide
        function showNextSlide() {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateSliderPosition();
        }

        // Retrocede para o slide anterior
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
            updateSliderPosition();
        });

        // Avança para o próximo slide quando o botão de próxima for clicado
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
            updateSliderPosition();
        });

    });
});