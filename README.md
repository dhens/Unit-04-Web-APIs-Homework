# Unit-04-Javascript-Quiz-Game

This is a web app that serves the user a quiz dynamically based off an external file that holds the questions, the possible answers, and the correct answer.
Production page: https://dhens.github.io/Unit-04-Web-APIs-Homework/ 

![quizPage](https://i.imgur.com/ZnTYxzB.png)

## This repo contains:
* This README
* A Javascript-and-Bootstrap-powered quiz that dynamically creates a question and answer form based off of data from our external file questions.js
* A javascript file (questions.js) that stores our questions, answers, and correct answer values

## Known Issues
* There's too much DOM manipulation. This caused headaches with defining where an element was in the DOM. This could be fixed by putting these tags and elements into the HTML before-hand, and simply calling it when neccessary as it is always accessible.
* I used global variables due to poor planning and ignorance about nested functions, and returns.

## What I Learned:
* Bootstrap allows you to focus on the functionality of the page, rather than spending a lot of time just making the website look the way it needs to.
* Knowing how scope works can prevent headaches and drawing an outline of how your code will work and why (psuedocode) will make development faster and easier. Pesudocode is just as important as the actual coding.

## Conclusion:
* I need to study how return works and how scope affects the ability to call variables and functions.
