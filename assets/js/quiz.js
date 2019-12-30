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
        debugger;
        let qTitle = questions[i].title;

        // Create Title Text
        let qTitleElement = document.createElement("h2");                       // Create a <h2> node
        let qTitleText = document.createTextNode(qTitle);                       // Create a text node
        qTitleElement.appendChild(qTitleText);                                  // Append the text to <li>
        document.getElementById("start-page-text").appendChild(qTitleElement);  // Append <h2> to <ul> with id="myList" 

        for (let ii = 0; ii < questions[i].choices.length; ii++) {

            let btnContent = questions[i].choices[ii];
            console.log("Current index in array: " + btnContent)

            // Create Buttons
            let btnElement = document.createElement("button");                       // Create a <li> node
            btnElement.setAttribute("id", "answer-button")
            let btnText = document.createTextNode(btnContent);                       // Create a text node
            btnElement.appendChild(btnText);                                         // Append the text to <li>
            startPageText.appendChild(btnElement);          // Append <li> to <ul> with id="myList" 

        }

    }

    });

    // function renderQuestion(index) {
    //             var qTitle = questions[i].title;

    //     let qTitleElement = document.createElement("h2");                       // Create a <li> node
    //     let qTitleText = document.createTextNode(qTitle);                       // Create a text node
    //     qTitleElement.appendChild(qTitleText);                                  // Append the text to <li>
    //     document.getElementById("start-page-text").appendChild(qTitleElement);  // Append <li> to <ul> with id="myList" 


    // }