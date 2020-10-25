var questions = [{
    title: "What does JavaScript do?",
    choices: ["Adds only structure to a web application( )", "Makes web application interactive( )", "Only changes the style( )",],
    answer: "Makes web application interactive( )"
},
{
    title: "What is stored in an array?",
    choices: ["Names of Git repos( )", "Personal bank account information( )", "A collection of data( )"],
    answer: "A collection of data( )"
},
{
    title: "What is the mtop-most element in the DOM?",
    choices: ["Document( )", "Root Element( )", "H1 Element( )"],
    answer: "Document( )"
}]

//Numerical variables for the functions, the scores and the timers
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Countdown timer which startes when user clicks the "Start Quiz" button on first page
function startQuiz() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //End the game when timer is below 0 
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//Stops timer and ends the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game is now over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>You got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//Stores the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//Score, name and value will ne cleared in the local storage if the user selects "Clear score"
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//Resets the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    Welcome To Our Coding Quiz Challenge!
</h1>
<h3>
Try to answer the following code-related questions within the time
limit noted in the top right corner. Keep in mind that incorrect answers will penalize your score time by ten seconds!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//Takes 10 seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 10; 
next();
}

//Adds 15 points to score if the user chooses the correct answer
function correct() {
score += 15;
next();
}

//Loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}
