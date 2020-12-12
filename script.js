const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let currentSlide = 0;

const questions = [{
        question: "Who created JavaScript?",
        answers: {
            a: "Douglas Crockford",
            b: "Sheryl Sandberg",
            c: "Brendan Eich"
        },
        correctAnswer: "c"
    },
    {
        question: "What is a package manager?",
        answers: {
            a: "Node.js",
            b: "TypeScript",
            c: "npm"
        },
        correctAnswer: "c"
    },
    {
        question: "What is a code quality checker tool?",
        answers: {
            a: "Angular",
            b: "jQuery",
            c: "RequireJS",
            d: "ESLint"
        },
        correctAnswer: "d"
    }
];

function buildQuiz() {

    const output = [];

    questions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];

            for (const letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        }
    );

    quizContainer.innerHTML = output.join("");
}

buildQuiz();
const slides = document.querySelectorAll(".slide");

function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++

            answerContainer.style.color = "lightgreen";
        } else {
            answerContainer.style.color = "red";
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`
}

function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

showSlide(currentSlide);

nextButton.addEventListener("click", showNextSlide);
previousButton.addEventListener("click", showPreviousSlide);
submitButton.addEventListener("click", showResults);