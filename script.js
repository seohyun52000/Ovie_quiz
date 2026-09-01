// 題目
const questions = [
  {
    question: "./images/questions/20260831_互動-生活習慣測掉髮危機V1_q1.jpg",
    options: [
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-01.png",
        score: 1
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-02.png",
        score: 2
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-03.png",
        score: 3
      }
    ]
  },
  {
    question: "./images/questions/20260831_互動-生活習慣測掉髮危機V1_q2.jpg",
    options: [
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-04.png",
        score: 1
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-05.png",
        score: 2
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-06.png",
        score: 3
      }
    ]
  },
  {
    question: "./images/questions/20260831_互動-生活習慣測掉髮危機V1_q3.jpg",
    options: [
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-07.png",
        score: 1
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-08.png",
        score: 2
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-09.png",
        score: 3
      }
    ]
  },
  {
    question: "./images/questions/20260831_互動-生活習慣測掉髮危機V1_q4.jpg",
    options: [
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-10.png",
        score: 1
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-11.png",
        score: 2
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-12.png",
        score: 3
      }
    ]
  },
  {
    question: "./images/questions/20260831_互動-生活習慣測掉髮危機V1_q5.jpg",
    options: [
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-13.png",
        score: 1
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-14.png",
        score: 2
      },
      {
        image: "./images/options/20260831_互動-生活習慣測掉髮危機-問題框_ol-15.png",
        score: 3
      }
    ]
  }
];

// 結果
const results = [
  {
    min: 5,
    max: 7,
    result: "./images/results/20260831_互動-生活習慣測掉髮危機-結果圖-01.jpg"
  },
  {
    min: 8,
    max: 10,
    result: "./images/results/20260831_互動-生活習慣測掉髮危機-結果圖-02.jpg"
  },
  {
    min: 11,
    max: 15,
    result: "./images/results/20260831_互動-生活習慣測掉髮危機-結果圖-03.jpg"
  }
];

// localStorage 儲存目前進度
let savedProgress = localStorage.getItem("quizProgress");
// 目前題數
let currentQuestion = 0;
// 總分
let totalScore = 0;
// 每一題選擇的分數
let answers = [];

// 重開時設定目前進度
if (savedProgress) {
  try {
    const data = JSON.parse(savedProgress);
    currentQuestion = data.currentQuestion || 0;
    totalScore = data.totalScore || 0;
    answers = data.answers || [];
  } catch (error) {
    currentQuestion = 0;
    totalScore = 0;
    answers = [];
  }
}

// 儲存目前進度
function saveProgress() {
  const data = {
    currentQuestion: currentQuestion,
    totalScore: totalScore,
    answers: answers
  };
  localStorage.setItem(
    "quizProgress",
    JSON.stringify(data)
  );
}

// 顯示題目
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }
  const questionData = questions[currentQuestion];
  document.getElementById("question").innerHTML =
    `<img src="${questionData.question}">`;

  // 進度
  document.getElementById("questionNumber").textContent =
    `第 ${currentQuestion + 1} 題 / 共 ${questions.length} 題`;
  const progress = (currentQuestion / questions.length) * 100;
  document.getElementById("progress").style.width = `${progress}%`;

  // 選項
  const optionsContainer =
    document.getElementById("options");
  optionsContainer.innerHTML = "";
  questionData.options.forEach((o, index) => {
    const option = document.createElement("img");
    option.className = "option";
    option.src = o.image;
    // 重新答題
    if (answers[currentQuestion] === o.score) {
      option.classList.add("selected");
    }
    option.onclick = function () {
      if (answers[currentQuestion] !== undefined) {
        totalScore -= answers[currentQuestion];
      }
      answers[currentQuestion] = o.score;
      totalScore += o.score;
      currentQuestion++;
      saveProgress();
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    };
    optionsContainer.appendChild(option);
  });
  // 返回按鈕顯示與否
  const prevButton = document.getElementById("prevButton");
  if (prevButton) {
    prevButton.style.display =
      currentQuestion === 0
        ? "none"
        : "block";
  }
}

// 返回上一題
function previousQuestion() {
  if (currentQuestion <= 0) {
    return;
  }
  currentQuestion--;
  totalScore -= answers[currentQuestion];
  answers[currentQuestion] = undefined;
  saveProgress();
  showQuestion();
}

// 顯示結果
function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  const result = results.find(
    item =>
      totalScore >= item.min &&
      totalScore <= item.max
  );
  if (result) {
    document.getElementById("resultImage").innerHTML =
      `<img src="${result.result}">`;
  }
  localStorage.removeItem("quizProgress");
}


// 重新開始
function restartQuiz() {
  currentQuestion = 0;
  totalScore = 0;
  answers = [];
  localStorage.removeItem("quizProgress");
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  showQuestion();
}


// 初始化
showQuestion();