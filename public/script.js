const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('option');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
  const response = await fetch('/questions');
  const questionsData = await response.json();
  return questionsData;
}

function displayQuestion(question) {

  questionElement.textContent = question.question;

  optionsElement.innerHTML = '';

  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(option, question.answer));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionElement.textContent = 'Quiz Over!';
  optionsElement.innerHTML = '';
  submitButton.style.display = 'none';
  scoreElement.textContent = `Your Score: ${score}/${questions.length}`;
}

fetchQuestions().then(data => {
  questions = data;
  if (questions.length > 0) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    questionElement.textContent = 'No questions available!';
  }
});