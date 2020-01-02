// Declare locations
const startPageText = document.getElementById("start-page-text");
const startButton = document.getElementById("start-quiz-button");

// Define iteration counter (i) for renderTitle and renderAnswerButtons's parameter arguments
// We later update the value of it from within the renderAnswerButtons function using i++ and returning it's value  
let i = 0;

startButton.addEventListener("click", function(callback) {
    console.log("Start Quiz button clicked");
    // BEGIN TIMER HERE

    // For each child of start-page-text id, remove it from the DOM
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }

    nextQuestion();

    
});

function renderTitle(titleIndex) {

    // For each child of start-page-text id, remove it from the DOM
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }

    let qTitle = questions[titleIndex].title;
    let qTitleElement = document.createElement("h2"); 
    let qTitleText = document.createTextNode(qTitle);                      
    qTitleElement.appendChild(qTitleText);                                  
    startPageText.appendChild(qTitleElement);
    console.log("Rendered title: " + qTitle);
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
        // console.log("Current index in array: " + btnContent);
    }
    // Updates the iteration count so each time you click an answer button it will render the next question
    i++
    return i;
}
    
function currentAnswer(titleIndex) {
    // We subtract one because this function is called after renderAnswerButton is called 
    let answerKeyObj = questions[titleIndex - 1].answer;
    return answerKeyObj;
}

function nextQuestion() {
    // If the iteration count is not equal to the number of questions in our list, then 
    if (i != questions.length) {
        renderTitle(i);
        renderAnswerButtons(i);
        let answerKeyObj =  currentAnswer(i);
        let answerButtons = document.getElementById("answer-buttons");

        answerButtons.addEventListener("click", function() {
            let selectedButton = event.target;
            if(selectedButton.matches("button")) {
                console.log("A button has been clicked")
                if(selectedButton.innerText !== answerKeyObj) {
                    alert("Wrong answer!");
                    nextQuestion();
                }
                else{
                    alert("Correct answer!");
                    nextQuestion();
                }
            }
        });

    }else{
        document.write("Game finished!")
        // RUN finishedGame();
        
        }
    }