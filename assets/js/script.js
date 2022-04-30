var questionEl = document.getElementById("question");
var choiceEl = document.getElementById("choices"); 
var solutionEl = document.getElementById("solution");
var timerEl = document.getElementById("quiz-timer");
var timeRemain = 0;
var timeInterval;

var quizQuestions = [
    {
        question: "Arrays in JavaScript can be used to store ______.",
        choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        solution: "All of the above"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal/Bash", "For loops", "console.log"],
        solution: "console.log"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
        solution: "Quotes"
    },
    {
        question: "The condition in an if/else statement is enclosed with _______.",
        choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        solution: "Parentheses"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        solution: "Alerts"
    }
];

function beginQuiz () {
    quizTimer();
    questionFunction();
};

var questionIndex = 0;

function questionFunction () {
    var currentQuestion = quizQuestions[questionIndex];
    questionEl.textContent = currentQuestion.question;
    choiceEl.innerHTML = "";
    for ( var i = 0; i < currentQuestion.choices.length; i++) {
        const solution = currentQuestion.choices[i];
        const choice = document.createElement("button");
        choice.setAttribute("class", "btns");
        choice.textContent = currentQuestion.choices[i];
        choice.addEventListener("click", () => {
            chooseSolution(solution);
        })
        choiceEl.append(choice);
    };
};

function chooseSolution(solution) {
    if (solution === quizQuestions[questionIndex].solution) {
        solutionEl.textContent = "Great job!";
    } else {
        solutionEl.textContent = "Try again next time!";
        timeRemain = timeRemain - 15;
    }
    questionIndex++;
    if (questionIndex === quizQuestions.length) {
        gameOver();
    } else {
        questionFunction();
    }
};

function quizTimer () {
    timeRemain = 100;
    timeInterval = setInterval(function() {
        if (timeRemain < 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "0";
            timeRemain = 0;
            gameOver();
        } else {
            timerEl.textContent = "Time remaining: " + [timeRemain]
            timeRemain--;
        }
    }, 1000);
};

function gameOver() {
    clearInterval(timeInterval);
    questionEl.textContent = "The quiz is over, check out your score!";
    choiceEl.textContent = "You scored " + [timeRemain] + " points!";
    timerEl.textContent = "";
    solutionEl.textContent = "";
}

onload(beginQuiz());