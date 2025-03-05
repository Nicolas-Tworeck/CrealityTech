
//transição imagens
function showImagesInSequence() {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

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


