const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');

const questionElement = document.getElementById('question');
const answerButtonElements = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide');

  // the function we call on sort method acts like this -
  // if it is a positive number then array is sorted in one way
  // and if value is negative array is sorted another way
  // so with  Math.random() - 0.5 we get 50% positive and 50% negative values meaning that array will change its sorted condition according to this 50%
  //  This way we get a complete randomly sorted array
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonElements.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonElements.firstChild) {
    answerButtonElements.removeChild(answerButtonElements.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  console.log(selectedButton);
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonElements.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'What is 2+2?',
    answers: [
      { text: '2', correct: true },
      { text: '22', correct: false },
    ],
  },
  {
    question: 'What is the best programming language?',
    answers: [
      { text: 'Javascript', correct: true },
      { text: 'Python', correct: false },
    ],
  },
];
