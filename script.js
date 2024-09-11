const questions = [
    {
        question: 'Kenapa mas pe suka wawi,soalnya?',
        answers: [
            { text: 'Tobrut', correct: false },
            { text: 'cantik', correct: false },
            { text: 'lontay', correct: true },
            { text: 'kece', correct: false }
        ]
    },
    {
        question: 'kenapa mas pe suka stalking wawi',
        answers: [
            { text: 'soale sangar', correct: false },
            { text: 'soale cek oleh pap imut', correct: true },
            { text: 'soale ngefans berat', correct: false },
            { text: 'soale pengan dirabi ae', correct: false }
        ]
    },
    {
        question: 'Tebak pap imut wawi digalerinya mas pe',
        answers: [
            { text: 'ada banyak dan random', correct: true },
            { text: 'banyakan foto', correct: false },
            { text: 'hasil colongan', correct: false },
            { text: 'banyakan video', correct: false }
        ]
    },
    {
        question: 'kenapa pap imut e wawi jadi wallpaper grup e mas pe?',
        answers: [
            { text: 'soale ayu', correct: false },
            { text: 'biar gak bosen', correct: false },
            { text: 'enak dipandang', correct: true },
            { text: 'cek semangat ngetik', correct: false }
        ]
    },
    {
        question: 'Kok nyerah emang lawannya siapa?',
        answers: [
            { text: 'orang yang dia suka', correct: false },
            { text: 'Pahlawan e', correct: false },
            { text: 'teman sekelas e', correct: false },
            { text: 'seng bendino ketemu', correct: true }
        ]
    },
    {
        question: 'Aku vs Pahlawanmu?',
        answers: [
            { text: 'panggah loss', correct: false },
            { text: 'cepele anyingg', correct: true },
            { text: 'sadar diri', correct: false },
            { text: 'pantang nyerah', correct: false }
        ]
    },
    // Tambahkan pertanyaan lainnya di sini ...
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    resultElement.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-button');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
    } else {
        selectedAnswer = answer;
    }
    nextButton.classList.remove('hidden');
}

function showNextQuestion() {
    if (selectedAnswer) {
        showCorrectAnswer();
        selectedAnswer = null;
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            nextButton.classList.add('hidden');
        } else {
            showResult();
        }
    }
}

function showCorrectAnswer() {
    const correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct);
    answerButtons.querySelectorAll('.answer-button').forEach(button => {
        if (button.innerText === correctAnswer.text) {
            button.classList.add('correct');
        }
    });
    nextButton.classList.add('hidden');
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            nextButton.classList.add('hidden');
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    questionElement.innerText = '';
    answerButtons.innerHTML = '';
    nextButton.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.innerText = `Hasil e skormu: ${score} dari ${questions.length}`;
}

nextButton.addEventListener('click', showNextQuestion);

startGame();
