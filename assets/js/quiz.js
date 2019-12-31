console.log("Successfully loaded quiz.js")

// Declare locations
let startPageText = document.getElementById("start-page-text");
let startButton = document.getElementById("start-quiz-button");

startButton.addEventListener("click", function() {
    console.log("Start Quiz button pressed")

    // For each child of start-page-text id, remove it from the DOM
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }


    // As long as there are items in questions array, populate the page with the title and choices
    for (let i = 0; i < questions.length; i++) {

        renderTitle(i);

        for (let ii = 0; ii < questions[i].choices.length; ii++) {

            renderAnswerButtons(i, ii);

        }
    }

    });

    function renderTitle(index) {
        let qTitle = questions[index].title;
        let qTitleElement = document.createElement("h2");                     
        let qTitleText = document.createTextNode(qTitle);                      
        qTitleElement.appendChild(qTitleText);                                  
        document.getElementById("start-page-text").appendChild(qTitleElement);  

    }

    function renderAnswerButtons(index, index2) {
        let btnContent = questions[index].choices[index2];
        let btnElement = document.createElement("button");                     
        btnElement.setAttribute("id", "answer-button")
        let btnText = document.createTextNode(btnContent);                      
        btnElement.appendChild(btnText);                                         
        startPageText.appendChild(btnElement);
        console.log("Current index in array: " + btnContent)
    }          