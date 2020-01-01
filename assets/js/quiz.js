console.log("Successfully loaded quiz.js");

// Declare locations
const startPageText = document.getElementById("start-page-text");
const startButton = document.getElementById("start-quiz-button");

// Define iteration counters (i, ii) for renderTitle and renderAnswerButtons's parameter arguments
// We later update the values of both from within each function using titleIndex++ and ii++ respectively 
let i = 0;
let ii = 0;


startButton.addEventListener("click", function() {
    console.log("Start Quiz button clicked");

    // For each child of start-page-text id, remove it from the DOM
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }


    renderTitle(i);
    renderAnswerButtons(i);
    const answerButtons = document.getElementById("answer-buttons");


answerButtons.addEventListener("click", function() {
    event.preventDefault();
    if(event.target.matches("button")) {
        renderTitle(i);
        renderAnswerButtons(i, ii);
        console.log("answer button has been clicked")

    }

});
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
        titleIndex++;
    }

    function renderAnswerButtons(titleIndex, btnChoiceIndex) {

        // Create a new div with an ID of answer-buttons to put the individual buttons in
        let answerBtnDiv = document.createElement("DIV"); 
        answerBtnDiv.setAttribute("id", "answer-buttons");
        startPageText.appendChild(answerBtnDiv);
        const answerButtons = document.getElementById("answer-buttons");

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