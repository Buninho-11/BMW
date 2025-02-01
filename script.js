const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

let questions = [
  {
    question: "Em que ano foi lançado o BMW M3 E30?",
    answers: ["1985", "1990", "1995", "2000"],
    correct: "1985"
  },
  {
    question: "Qual o modelo do BMW M3 que tem o motor 2.3L de 4 cilindros?",
    answers: ["E30", "E92"],
    correct: "E30"
  },
  {
    question: "Quantos cavalos o BMW M3 E46 tem?",
    answers: ["343", "450"],
    correct: "343"
  },
  {
    question: "O que significa o 'M' no BMW M3?",
    answers: ["Motorsport", "Modern"],
    correct: "Motorsport"
  },
  {
    question: "Qual é o modelo mais recente da linha BMW M3?",
    answers: ["F80", "G80"],
    correct: "G80"
  },
  {
    question: "Quantos cilindros tem o motor do BMW M3 G80?",
    answers: ["4", "6", "8"],
    correct: "6"
  },
  {
    question: "Qual é a potência máxima do BMW M3 E92?",
    answers: ["420 hp", "450 hp", "500 hp"],
    correct: "420 hp"
  },
  {
    question: "Qual foi o modelo BMW M3 que teve a primeira tração nas quatro rodas?",
    answers: ["F80", "G80"],
    correct: "G80"
  },
  {
    question: "Qual é o nome da transmissão automática usada no BMW M3 F80?",
    answers: ["SMG", "DCT", "ZF8"],
    correct: "DCT"
  },
  {
    question: "O BMW M3 E46 tem opção de capota rígida ou capota...",
    answers: ["Flexível", "Targa", "Conversível"],
    correct: "Conversível"
  },
  {
    question: "O BMW M3 E30 participou de qual campeonato de turismo?",
    answers: ["DTM", "BTCC", "WTCC"],
    correct: "DTM"
  },
  {
    question: "Qual a velocidade máxima limitada do BMW M3 F80?",
    answers: ["250 km/h", "280 km/h", "300 km/h"],
    correct: "250 km/h"
  },
  {
    question: "O BMW M3 E92 era conhecido pelo motor...",
    answers: ["V8 naturalmente aspirado", "6 cilindros turbo", "V6 supercharged"],
    correct: "V8 naturalmente aspirado"
  }
];

let time = 15,  // Tempo alterado para 15 segundos
  score = 0,
  currentQuestion = 0,
  timer;

const startQuiz = () => {
  startScreen.classList.add("hide");
  quiz.classList.remove("hide");
  showQuestion(questions[currentQuestion]);
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  answersWrapper.innerHTML = "";
  question.answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  questionNumber.innerHTML = `Pergunta <span class="current">${currentQuestion + 1}</span> <span class="total">/${questions.length}</span>`;

  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        // Desmarcar as outras respostas e marcar a selecionada
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        checkAnswer();
      }
    });
  });

  time = 15; // Reset timer for each question
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();  // Se o tempo acabar, checa a resposta
    }
  }, 1000);
};

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");

  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion].correct) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      document.querySelectorAll(".answer").forEach((answer) => {
        if (answer.querySelector(".text").innerHTML === questions[currentQuestion].correct) {
          answer.classList.add("correct");
        }
      });
    }
  } else {
    // Se o tempo acabar sem resposta, a resposta correta será destacada
    document.querySelectorAll(".answer").forEach((answer) => {
      if (answer.querySelector(".text").innerHTML === questions[currentQuestion].correct) {
        answer.classList.add("correct");
      }
    });
  }

  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.add("checked");
  });

  // Esperar 3 segundos para dar tempo ao usuário de ver a resposta correta
  setTimeout(nextQuestion, 3000);
};

const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(questions[currentQuestion]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");

const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});



