let question = document.querySelector("#question");
let NextBtn = document.querySelector("#next-btn");
let btn = document.querySelectorAll(".btn");
let answerButtons = document.querySelector("#answer-buttons");
let Index = document.querySelector("#value");
let StartBtn = document.querySelector(".startBtn");
let App = document.querySelector(".app");
let Main = document.querySelector(".main");
let PreviousBtn = document.querySelector("#previous-btn");
let SubmitBtn = document.querySelector("#submit-btn");
let ScoreBtn = document.querySelector("#score-btn");

const Questions = [
    {
        question: "What is the capital of France?",
        answer: [
            { text: "Madrid", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answer: [
            { text: "O2", correct: false },
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false },
        ]
    },
    {
        question: "Which is the largest ocean on Earth?",
        answer: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Which country has the largest population in the world?",
        answer: [
            { text: "India", correct: false },
            { text: "China", correct: true },
            { text: "United States", correct: false },
            { text: "Indonesia", correct: false }
        ]
    },
    {
        question: "In which country is the Great Barrier Reef located?",
        answer: [
            { text: "Australia", correct: true },
            { text: "Brazil", correct: false },
            { text: "Mexico", correct: false },
            { text: "South Africa", correct: false }
        ]
    }
];

let currentIndex = 0;
let value = 1;

function displayQuiz() {
    StartBtn.addEventListener("click", () => {
        App.style.display = "block";
        Main.style.display = "none";
        showQuestions();
    });
}

function showQuestions() {
    if (Questions.length > 0) {
        question.innerHTML = Questions[currentIndex].question;
        Index.innerHTML = `${value}/${Questions.length}`;

        btn.forEach(function (val, index) {
            if (Questions[currentIndex].answer[index]) {
                val.innerHTML = Questions[currentIndex].answer[index].text;
                val.style.display = "block";
            } else {
                val.style.display = "none";
            }
        });
    }
}

function nextBtn() {
    NextBtn.addEventListener("click", () => {
        if (currentIndex < Questions.length - 1) {
            currentIndex++;

            question.innerHTML = Questions[currentIndex].question;
            value++;
            btn.forEach(function (val, index) {
                val.innerHTML = Questions[currentIndex].answer[index].text;
                val.classList.remove("selected")
            })
            reset();
            selectAnswer()

            Index.innerHTML = `${value}/${Questions.length}`
            if (currentIndex === Questions.length - 1) {
                NextBtn.style.display = "none";
                SubmitBtn.style.display = "block";
            }
        }
    })
}

function submitBtn() {
    SubmitBtn.addEventListener("click", () => {
        question.innerHTML = "No more questions!";
        answerButtons.style.display = "none";
        SubmitBtn.style.display = "none";
    });
}


function selectAnswer() {
    btn.forEach(function (val, index) {
        val.onclick = () => {
            btn.forEach(button => button.disabled = true);

            const answer = Questions[currentIndex].answer[index].correct;
            if (answer) {
                val.classList.add("correct");
                NextBtn.style.display = "block";
            } else {
                val.classList.add("incorrect");
                btn.forEach((button, i) => {
                    if (Questions[currentIndex].answer[i]?.correct) {
                        button.classList.add("correct");
                        NextBtn.style.display = "block";
                    }
                    if (currentIndex === Questions.length - 1) {
                        NextBtn.style.display = "none";
                        SubmitBtn.style.display = "block";
                    }
                });
            }
        };
    });
}

function reset() {
    btn.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "incorrect", "selected");
        NextBtn.style.display = "none";
    });
}

(function All() {
    displayQuiz();
    nextBtn();
    submitBtn();
    selectAnswer();
})();
