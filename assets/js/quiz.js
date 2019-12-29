let startPageText = document.getElementById("start-page-text");
let startButton = document.getElementById("start-quiz-button");
console.log(startButton);


startButton.addEventListener("click", function() {
    while (startPageText.firstChild) {
        startPageText.firstChild.remove();
    }
    console.log("Button pressed")
    });