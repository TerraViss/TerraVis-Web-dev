const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let timer;

function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function startAuto() {
    timer = setInterval(() => goTo(current + 1), 4000);
}

function resetAuto() {
    clearInterval(timer);
    startAuto();
}

document.querySelector('.slide-prev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
document.querySelector('.slide-next').addEventListener('click', () => { goTo(current + 1); resetAuto(); });

dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(Number(dot.dataset.index)); resetAuto(); });
});

startAuto();
