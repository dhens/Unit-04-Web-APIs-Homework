// TODO:
// GET LOCALSTORAGE TO STORE THE NAME OF THE PERSON AS A STRING, AND 
// KEEP TRACK OF ALL NAMES BY ADDING IT INTO AN ARRAY AS WELL AS THE LOCALSOTRAGE
// SO IT CAN BE CALLED LATER

// CHANGE ALERTS FOR CORRECT AND WRONG ASNWER TO TEXT THAT POPS UP FOR 1.5 SECONDS

// MAKE VIEW HIGHSCORES SIMPLY RENDER THE SAVED LOCAL STORAGE SCORES

// Declare locations
const startPageText = document.getElementById("start-page-text");
const startButton = document.getElementById("start-quiz-button");
const viewHighscores = document.getElementById("view-highscores")
const timerText = document.getElementById("timer");

// Declare number of questions based off the number of indexes in our quesions.js file
let qLength = questions.length;

// Define iteration counter (i) for renderTitle and renderAnswerButtons's parameter arguments
// We later update the value of it from within the renderAnswerButtons function using i++ and returning it's value  
let i = 0;

// Let time limit be 15 seconds per question.
let timer = qLength * 15;

// Initialize time variables
let timeInterval, timeCheckVal;

// When we press the start quiz button
startButton.addEventListener("click", function() { 
    timeInterval = setInterval(startTimer, 1000);
    timeCheckVal = setInterval(timeCheck, 1000);
    
    startTimer();
    timeCheck();
    nextQuestion();
    return timeInterval, timeCheckVal;


});

viewHighscores.addEventListener("click", function(e) {
    // Keeps page from reloading on click and running through the whole quiz.js again
    e.preventDefault();
    viewHighScoresScreen();
    renderHighscores();
});

// For each child of start-page-text id, remove it from the DOM
function clearGameArea() {
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }
}

function renderTitle(titleIndex) {

    clearGameArea();

    let qTitle = questions[titleIndex].title;
    let qTitleElement = document.createElement("h2"); 
    let qTitleText = document.createTextNode(qTitle);                      
    qTitleElement.appendChild(qTitleText);                                  
    startPageText.appendChild(qTitleElement);
}

function renderAnswerButtons(titleIndex) {

    // Create a new div with an ID of answer-buttons to put the individual buttons in
    let answerBtnDiv = document.createElement("DIV"); 
    answerBtnDiv.setAttribute("id", "answer-buttons");
    startPageText.appendChild(answerBtnDiv);
    let answerButtons = document.getElementById("answer-buttons");

    // Loop through each index in the current object's "choices" array and create a button with text from the index
    for (let choiceIterationCount = 0; choiceIterationCount < questions[titleIndex].choices.length; choiceIterationCount++) {

        // Define variable that is selecting the index of the val of titleIndex, which starts at 0
        // Ex: questions[0].choices[0] = strings
        let btnContent = questions[titleIndex].choices[choiceIterationCount];
        let btnElement = document.createElement("button");
        let btnText = document.createTextNode(btnContent);                      
        
        // Create an ID attribute for our button. Used for styling.            
        btnElement.setAttribute("id", "answer-button");

        btnElement.appendChild(btnText);
        answerButtons.appendChild(btnElement);
    }
    // Updates the iteration count so each time you click an answer button it will render the next question
    i++
    return i;
}
    
function currentAnswer(titleIndex) {
    // We subtract one because this function is called after renderAnswerButton is called which does i++
    let answerKeyObj = questions[titleIndex - 1].answer;
    return answerKeyObj;
}

function nextQuestion() {
    // If the current iteration count is not equal to the number of questions in our list, then render the next question
    if (i != qLength) {
        renderTitle(i);
        renderAnswerButtons(i);
        let answerKeyObj =  currentAnswer(i);
        let answerButtons = document.getElementById("answer-buttons");

        answerButtons.addEventListener("click", function() {
            let selectedButton = event.target;
            if(selectedButton.matches("button")) {
                if(selectedButton.innerText !== answerKeyObj) {
                    alert("Wrong answer!");
                    timer = timer - 5;
                    nextQuestion();
                }
                else{
                    alert("Correct answer!");
                    nextQuestion();
                }
            }
        });

    }else{
        // RUN gameOver();
        gameOver();
        
        }
    }

function startTimer() {
    timerText.innerText = "Time Remaining: " + timer;
    timer--;
    return timeInterval;
}

function myStopFunction() {
    clearInterval(timeInterval);
    clearInterval(timeCheckVal);
    }

function timeCheck() {
    if (timer <= -1) {
        gameOver();
    }
}

// Create the leaderboard / high score screen after the game is over
function enterScoreScreen() {
    clearGameArea();
    timerText.innerText = "Time Remaining: 0";

    // Make all done text
    let highScoreElement = document.createElement("h2"); 
    let highScoreText = document.createTextNode("All done!");                      
    highScoreElement.appendChild(highScoreText);                                  
    startPageText.appendChild(highScoreElement);

    // Make text above input field
    let finalScoreElement = document.createElement("p"); 
    // Timer is always 1 second ahead, and this matches the time remaining number at the top right
    timer++;
    let finalScoreText = document.createTextNode("Your final score is: " + timer);                      
    finalScoreElement.appendChild(finalScoreText);                                  
    startPageText.appendChild(finalScoreElement);

    // Make row for input field and submit button to go in
    let submissionContainerElement = document.createElement("div"); 
    let submissionContainerAttrClass = submissionContainerElement.setAttribute("class", "row");
    let submissionContainerAttrId = submissionContainerElement.setAttribute("id", "submit-row");
    startPageText.appendChild(submissionContainerElement);  
    let submissionDiv = document.getElementById("submit-row");

    // Enter name: text before input field
    let enterNameElement = document.createElement("p"); 
    let enterNameText = document.createTextNode("Enter initials: ");   
    let enterNameAttr = enterNameElement.setAttribute("class", "col-md-3")                   
    enterNameElement.appendChild(enterNameText);                                  
    submissionDiv.appendChild(enterNameElement);

    // Make name input field
    let inputElement = document.createElement("input"); 
    inputElement.setAttribute("class", "col-md-6");
    inputElement.setAttribute("id", "name-input");      
    submissionDiv.appendChild(inputElement);

    // Make submit button
    let btnElement = document.createElement("button");
    let btnText = document.createTextNode("Submit");                          
    btnElement.setAttribute("class", "btn btn-primary col-md-3");
    btnElement.appendChild(btnText);
    submissionDiv.appendChild(btnElement);

    nameInput = document.getElementById("name-input");
    submitButton = document.getElementsByClassName("btn btn-primary col-md-3")[0];


    renderHighscores();

    // Listener event for when we submit our name to the highscore list
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        if(nameInput.value === "") {
            return;
        }

        localStorage.setItem(nameInput.value, timer);
        let li = document.createElement("li");
        li.textContent = nameInput.value + " - " + timer;
        startPageText.appendChild(li);

    });
}

// go through each item in localstorage and make an li for it and display on page
function renderHighscores() {
    let orderedList = document.createElement("ol");
    orderedList.setAttribute("id", "ordered-list");
    startPageText.appendChild(orderedList);
    for (let i = 0; i < localStorage.length; i++){
        let orderedListLocation = document.getElementById("ordered-list");
        console.log("i val: " + i);
        let currentKey = Object.entries(localStorage); 
        let currentScore = localStorage.getItem(localStorage.key(i));
        let highScoreElement = document.createElement("li");
        let highscoreText = document.createTextNode(currentKey[i]);
        highScoreElement.appendChild(highscoreText);
        orderedListLocation.appendChild(highScoreElement);
    }
}

// To view the highscores, but not update them like enterScoreScreen
function viewHighScoresScreen() {
    clearGameArea();
    // Make highschore text
    let highScoreElement = document.createElement("h2"); 
    let highScoreText = document.createTextNode("Highscores");                      
    highScoreElement.appendChild(highScoreText);                                  
    startPageText.appendChild(highScoreElement);

    let btnElement = document.createElement("button");
    let btnText = document.createTextNode("Go Back");                          
    btnElement.setAttribute("class", "btn btn-primary");
    btnElement.setAttribute("id", "go-back-btn")
    btnElement.appendChild(btnText);
    startPageText.appendChild(btnElement);

    let clearBtnEl = document.createElement("button");
    let clearBtntext = document.createTextNode("Clear");                          
    clearBtnEl.setAttribute("class", "btn btn-warning");
    clearBtnEl.setAttribute("id", "go-back-btn")
    clearBtnEl.appendChild(clearBtntext);
    startPageText.appendChild(clearBtnEl);

    clearButton = document.getElementsByClassName("btn btn-warning")[0];
    let goBackButton = document.getElementById("go-back-btn")

    goBackButton.addEventListener("click", function() {
        location.reload();
    });

    clearButton.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("CLEAR BUTTON EVENT")
        localStorage.clear();
        renderHighscores();
        viewHighScoresScreen();
    });
}

// function sortLocalStorage(){
//     debugger;
//     if(localStorage.length > 0){
//        localStorageArr = [];
//        for (let i = 0; i < localStorage.length; i++){
//            localStorageArr[i] = localStorage.key(i)+localStorage.getItem(localStorage.key(i));
//        }
//     }
//     let sortedArray = localStorageArr.sort(function(a, b) {
//         return b - a
//     }); 
//     return sortedArray;
//  }

function gameOver() {
    clearGameArea();
    myStopFunction();
    enterScoreScreen();
}