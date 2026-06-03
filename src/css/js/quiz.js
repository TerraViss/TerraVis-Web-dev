const questions = [
    {
        text: 'Quantos estabelecimentos rurais no Brasil são de pequeno porte?',
        options: ['30%', '50%', '77%', '90%'],
        correct: 2
    },
    {
        text: 'Qual é o custo para acessar imagens do satélite Sentinel-2 da ESA?',
        options: ['US$ 500 por imagem', 'US$ 50 por mês', 'Gratuito', 'Disponível apenas para governos'],
        correct: 2
    },
    {
        text: 'Em média, quanto da produção agrícola pode ser perdida por falta de monitoramento adequado?',
        options: ['5%', '10%', '30%', '50%'],
        correct: 2
    },
    {
        text: 'O Brasil registra, em média, quantos focos de incêndio por ano?',
        options: ['Menos de 10 mil', 'Cerca de 50 mil', 'Mais de 200 mil', 'Cerca de 100 mil'],
        correct: 2
    },
    {
        text: 'Qual estado brasileiro sofreu a maior enchente de sua história recente, em 2024?',
        options: ['Santa Catarina', 'Minas Gerais', 'Rio Grande do Sul', 'Pará'],
        correct: 2
    },
    {
        text: 'Qual tecnologia espacial permite monitorar alagamentos mesmo durante chuvas intensas e céu nublado?',
        options: [
            'Câmera óptica do Sentinel-2',
            'Sensor térmico do MODIS',
            'Radar SAR do Sentinel-1',
            'GPS de alta precisão'
        ],
        correct: 2
    },
    {
        text: 'Plantar fora da janela ideal pode reduzir a produtividade em quanto?',
        options: ['5%', '15%', '40%', '60%'],
        correct: 2
    },
    {
        text: 'Qual é o índice NDVI de uma lavoura com estresse hídrico severo?',
        options: ['Acima de 0.6', 'Entre 0.4 e 0.6', 'Entre 0.2 e 0.4', 'Abaixo de 0.2'],
        correct: 3
    },
    {
        text: 'Quantas horas após um foco de incêndio o sistema FIRMS da NASA emite o alerta?',
        options: ['24 horas', '12 horas', '6 horas', '3 horas'],
        correct: 3
    },
    {
        text: 'O que diferencia o TerraVis de um app de clima comum?',
        options: [
            'Usa inteligência artificial avançada',
            'Cruza dados de múltiplos satélites para gerar alertas específicos por propriedade',
            'Funciona apenas com conexão 5G',
            'É exclusivo para grandes produtores'
        ],
        correct: 1
    }
];

const LETTERS = ['A', 'B', 'C', 'D'];

let currentIndex = 0;
let score = 0;
let answered = false;

function getResultMessage(points) {
    if (points <= 3) return 'Continue estudando sobre o TerraVis e o monitoramento orbital!';
    if (points <= 6) return 'Bom trabalho! Você está no caminho certo.';
    if (points <= 9) return 'Muito bem! Você domina o tema.';
    return 'Perfeito! Você é um expert em TerraVis!';
}

function updateProgress() {
    const total = questions.length;
    document.getElementById('question-counter').textContent =
        `Pergunta ${currentIndex + 1} de ${total}`;
    document.getElementById('progress-fill').style.width =
        `${((currentIndex + 1) / total) * 100}%`;
}

function renderQuestion() {
    answered = false;

    const q = questions[currentIndex];
    document.getElementById('question-text').textContent = q.text;

    const list = document.getElementById('options-list');
    list.innerHTML = '';

    q.options.forEach((optionText, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${optionText}</span>`;
        btn.addEventListener('click', () => selectOption(i));
        list.appendChild(btn);
    });

    const btnNext = document.getElementById('btn-next');
    btnNext.disabled = true;
    btnNext.textContent = 'Próxima →';

    updateProgress();
}

function selectOption(selectedIndex) {
    if (answered) return;
    answered = true;

    const q = questions[currentIndex];
    const buttons = document.querySelectorAll('.option-btn');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add('correct');
        } else if (i === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    if (selectedIndex === q.correct) score++;

    const btnNext = document.getElementById('btn-next');
    btnNext.disabled = false;

    const isLastQuestion = currentIndex === questions.length - 1;
    btnNext.textContent = isLastQuestion ? 'Ver resultado' : 'Próxima →';
}

function nextQuestion() {
    if (!answered) return;
    currentIndex++;

    if (currentIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-screen').hidden = true;

    const resultScreen = document.getElementById('result-screen');
    resultScreen.hidden = false;

    document.getElementById('result-score').textContent = `${score} / ${questions.length}`;
    document.getElementById('result-message').textContent = getResultMessage(score);
}

function restart() {
    currentIndex = 0;
    score = 0;
    answered = false;

    document.getElementById('result-screen').hidden = true;
    document.getElementById('quiz-screen').hidden = false;

    renderQuestion();
}

function init() {
    document.getElementById('btn-next').addEventListener('click', nextQuestion);
    document.getElementById('btn-restart').addEventListener('click', restart);
    renderQuestion();
}

// ===== Temas =====
const TEMAS = ['tema-padrao', 'tema-diurno', 'tema-noturno'];
const TEMA_KEY = 'terravis-tema';

const aplicarTema = (tema) => {
    document.body.classList.remove(...TEMAS);
    if (tema !== 'tema-padrao') document.body.classList.add(tema);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tema === tema);
    });

    localStorage.setItem(TEMA_KEY, tema);
};

const initTemas = () => {
    const temaSalvo = localStorage.getItem(TEMA_KEY) || 'tema-padrao';
    aplicarTema(temaSalvo);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => aplicarTema(btn.dataset.tema));
    });
};

init();
initTemas();
