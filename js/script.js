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

// Demo form
const demoForm = document.getElementById('demo-form');
const demoSuccess = document.getElementById('demo-success');

function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    if (field) field.classList.add('input-error');
    document.getElementById(errorId).textContent = message;
}

function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    if (field) field.classList.remove('input-error');
    document.getElementById(errorId).textContent = '';
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const nome = document.getElementById('nome').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const checkedBoxes = document.querySelectorAll('input[name="funcionalidade"]:checked');

    clearError('nome', 'nome-error');
    clearError('empresa', 'empresa-error');
    clearError('email', 'email-error');
    clearError('telefone', 'telefone-error');
    document.getElementById('funcionalidade-error').textContent = '';
    document.getElementById('checkbox-group').classList.remove('group-error');

    if (!nome) {
        setError('nome', 'nome-error', 'Por favor, informe seu nome.');
        valid = false;
    }
    if (!empresa) {
        setError('empresa', 'empresa-error', 'Por favor, informe a empresa ou fazenda.');
        valid = false;
    }
    if (!email) {
        setError('email', 'email-error', 'Por favor, informe seu e-mail.');
        valid = false;
    } else if (!isValidEmail(email)) {
        setError('email', 'email-error', 'Informe um e-mail válido.');
        valid = false;
    }
    if (!telefone) {
        setError('telefone', 'telefone-error', 'Por favor, informe seu telefone.');
        valid = false;
    }
    if (checkedBoxes.length === 0) {
        document.getElementById('funcionalidade-error').textContent = 'Selecione ao menos uma funcionalidade.';
        document.getElementById('checkbox-group').classList.add('group-error');
        valid = false;
    }

    if (valid) {
        demoForm.hidden = true;
        document.getElementById('success-nome').textContent = nome;
        demoSuccess.hidden = false;
    }
});

['nome', 'empresa', 'email', 'telefone'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id, `${id}-error`));
});

document.querySelectorAll('input[name="funcionalidade"]').forEach(cb => {
    cb.addEventListener('change', () => {
        document.getElementById('funcionalidade-error').textContent = '';
        document.getElementById('checkbox-group').classList.remove('group-error');
    });
});
