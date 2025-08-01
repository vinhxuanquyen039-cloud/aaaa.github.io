const hiragana = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん", "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ", "だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];
const katakana = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン", "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ"];
const romaji = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "o", "n", "ga", "gi", "gu", "ge", "go", "za", "ji", "zu", "ze", "zo", "da", "ji", "zu", "de", "do", "ba", "bi", "bu", "be", "bo", "pa", "pi", "pu", "pe", "po"];

let currentMode = '';
let currentList = [];
let currentIndex = -1;
let chances = 2;
let maxWords = 5;

const mainMenu = document.getElementById('main-menu');
const quizScreen = document.getElementById('quiz-screen');
const questionChar = document.getElementById('question-char');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const addWordBtn = document.getElementById('add-word-btn');
const wordCountText = document.getElementById('word-count');
const chancesLeftText = document.getElementById('chances-left');
const answerDisplay = document.getElementById('answer-display');

function goToMainMenu() {
    mainMenu.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resetState();
}

function startQuiz(mode) {
    currentMode = mode;
    currentList = (mode === 'hiragana') ? hiragana : katakana;
    
    mainMenu.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    resetState();
    generateQuestion();
}

function resetState() {
    chances = 2;
    maxWords = 5;
    wordCountText.textContent = `Số chữ hiện tại: ${maxWords}`;
    chancesLeftText.textContent = `Cơ hội còn lại: ${chances}`;
    answerDisplay.classList.add('hidden');
    submitBtn.disabled = false;
    nextBtn.classList.add('hidden');
    answerInput.value = '';
    answerInput.disabled = false;
}

function generateQuestion() {
    currentIndex = Math.floor(Math.random() * maxWords);
    questionChar.textContent = currentList[currentIndex];
    answerInput.value = '';
    answerInput.focus();
    submitBtn.classList.remove('hidden');
    submitBtn.disabled = false;
    nextBtn.classList.add('hidden');
    answerDisplay.classList.add('hidden');
}

submitBtn.addEventListener('click', () => {
    const userAnswer = answerInput.value.toLowerCase().trim();
    const correctAnswer = romaji[hiragana.indexOf(currentList[currentIndex])].toLowerCase();

    if (userAnswer === correctAnswer) {
        alert('Chính xác!');
        showCorrectAnswer();
    } else {
        chances--;
        chancesLeftText.textContent = `Cơ hội còn lại: ${chances}`;
        if (chances <= 0) {
            alert('Hết cơ hội sai rồi, qua câu tiếp theo');
            showCorrectAnswer();
        } else {
            alert('Bạn nhập sai cách đọc rồi');
        }
    }
});

function showCorrectAnswer() {
    const correctAnswer = romaji[hiragana.indexOf(currentList[currentIndex])];
    answerDisplay.textContent = `Đáp án là: ${correctAnswer}`;
    answerDisplay.classList.remove('hidden');
    submitBtn.disabled = true;
    nextBtn.classList.remove('hidden');
    answerInput.disabled = true;
}

nextBtn.addEventListener('click', () => {
    chances = 2;
    chancesLeftText.textContent = `Cơ hội còn lại: ${chances}`;
    generateQuestion();
});

addWordBtn.addEventListener('click', () => {
    if (maxWords + 5 <= hiragana.length) {
        maxWords += 5;
        wordCountText.textContent = `Số chữ hiện tại: ${maxWords}`;
        alert(`Đã thêm 5 chữ cái. Số chữ hiện tại là ${maxWords}`);
        chances = 2;
        chancesLeftText.textContent = `Cơ hội còn lại: ${chances}`;
        generateQuestion();
    } else {
        maxWords = hiragana.length;
        wordCountText.textContent = `Số chữ hiện tại: ${maxWords}`;
        alert('Đã là số chữ cái tối đa.');
    }
});

answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (!submitBtn.disabled) {
            submitBtn.click();
        } else if (!nextBtn.classList.contains('hidden')) {
            nextBtn.click();
        }
    }
});

// Ban đầu hiển thị màn hình chính
document.addEventListener('DOMContentLoaded', () => {
    goToMainMenu();
});