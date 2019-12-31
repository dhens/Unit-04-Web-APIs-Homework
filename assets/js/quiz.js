console.log("Successfully loaded quiz.js");

// Declare locations
const startPageText = document.getElementById("start-page-text");
const startButton = document.getElementById("start-quiz-button");

startButton.addEventListener("click", function() {
    console.log("Start Quiz button clicked");

    // For each child of start-page-text id, remove it from the DOM
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }

    // Define iteration counters (i, ii) for renderTitle and renderAnswerButtons's parameter arguments
    // We later update the values of both from within each function using titleIndex++ and btnChoiceIndex++ respectively 
    let i = 0;
    let ii = 0;

    renderTitle(i);
    renderAnswerButtons(i, ii);
    const answerButtons = document.getElementById("answer-buttons");


answerButtons.addEventListener("click", function() {
    event.preventDefault();
    if(event.target.matches("button")) {
        console.log("One of the answers buttons was clicked");

    }

});
});

    function renderTitle(titleIndex) {
        let qTitle = questions[titleIndex].title;
        let qTitleElement = document.createElement("h2"); 
        let qTitleText = document.createTextNode(qTitle);                      
        qTitleElement.appendChild(qTitleText);                                  
        startPageText.appendChild(qTitleElement);
        console.log("Rendered title: " + qTitle);
        titleIndex++;
    }

    function renderAnswerButtons(titleIndex, btnChoiceIndex) {

        let answerBtnDiv = document.createElement("DIV"); 
        answerBtnDiv.setAttribute("id", "answer-buttons");
        startPageText.appendChild(answerBtnDiv);
        const answerButtons = document.getElementById("answer-buttons");

        // Loop through each index in the current object's "choices" array and create a button with text from the index
        for (let choiceIterationCount = 0; choiceIterationCount < questions[titleIndex].choices.length; choiceIterationCount++) {

            // Define variable that is selecting the index of the val of titleIndex, which starts at 0
            // Ex: questions[0].choices[0] = strings
            let btnContent = questions[titleIndex].choices[btnChoiceIndex];
            let btnElement = document.createElement("button");
            let btnText = document.createTextNode(btnContent);                      
            
            // Create an ID attribute for our button. Used for styling.            
            btnElement.setAttribute("id", "answer-button");

            btnElement.appendChild(btnText);
            answerButtons.appendChild(btnElement);
            console.log("Current index in array: " + btnContent);
            btnChoiceIndex++;
        }
    }          