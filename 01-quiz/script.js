// Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "World Environment day?",
    answers: [
      {text: "sep-20", correct: "Incorrect"},
      {text: "nov-12", correct: "Incorrect"},
      {text: "June-5", correct: "Correct"},
      {text: "dec-13", correct: "Incorrect"},
    ],
  },
  {
    question: "world diabetes day?",
    answers: [
      {text: "jun-09", correct: "Incorrect"},
      {text: "jul-10", correct: "Incorrect"},
      {text: "November-14", correct: "Correct"},
      {text: "aug-23", correct: "Incorrect"},
    ],
  },
    {
    question: "world health day?",
    answers: [
      {text: "sep-11", correct: "Incorrect"},
      {text: "oct-15", correct: "Incorrect"},
      {text: "April-7", correct: "Correct"},
      {text: "mar-10", correct: "Incorrect"},
    ],
  },
    {
    question: "world yoga day?",
    answers: [
      {text: "may-04", correct: "Incorrect"},
      {text: "may-05", correct: "Incorrect"},
      {text: "June-21", correct: "Correct"},
      {text: "may-12", correct: "Incorrect"},
    ],
  },  {
    question: "World Ozone day?",
    answers: [
      {text: "jul-10", correct: "Incorrect"},
      {text: "jan-29", correct: "Incorrect"},
      {text: "September-16", correct: "Correct"},
      {text: "feb-13", correct: "Incorrect"},
    ],
  },
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;
  
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.id = "the-btn";

    // dataset -> is a property of the button element
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);
   
    answersContainer.appendChild(button);

    // newDiv(div Element) is the Correct/Incorrect Marker inside each of the Answer Buttons
    // example: World Environment day?/June-5 (Answer Button)/Correct
    const newDiv = document.createElement('div');
    newDiv.textContent = answer.correct;

    newDiv.classList.add("div-btn");
    newDiv.id = "e-div"; // Generate unique id

    // dataset -> is a property of the button element
    newDiv.dataset.correct = answer.correct;

    button.appendChild(newDiv);
  });

}


function selectAnswer(event) {

  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;

  const isCorrect = selectedButton.dataset.correct === "Correct";

  // button implies Answer buttons
  // newDiv implies Correct/Incorrect Marker
  Array.from(answersContainer.children).forEach((button) => {
    if(button.dataset.correct === "Correct") {
      button.classList.add("correct");
      Array.from(button.children).forEach((newDiv) => {
      newDiv.classList.add("active");
      });
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
      Array.from(button.children).forEach((newDiv) => {
      newDiv.classList.add("active");
      });
    }
  });


  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // Check if quiz finished
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 2500);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Ok!";
  } else {
    resultMessage.textContent = "Have to Study more!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
