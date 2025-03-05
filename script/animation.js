function showImagesInSequence() {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    // Mostra a img2 primeiro
    setTimeout(() => {
        img2.style.opacity = 1;
    }, 500); // 1 segundo

    // Mostra a img1 depois de 2 segundos
    setTimeout(() => {
        img1.style.opacity = 1;
    }, 1000); // 2 segundos

    // Mostra a img3 depois de 3 segundos
    setTimeout(() => {
        img3.style.opacity = 1;
    }, 1500); // 3 segundos
}

// Inicia a animação quando a página carrega
window.onload = showImagesInSequence;