var score = 0;

function Question(question, answer1, answer2, answer3, answer4, indexOfRightAnswer) {

    this.question = question;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.indexOfRightAnswer = indexOfRightAnswer;

}

Question.prototype.displayQuestion = function() {
    console.log(this.question + '\n', '1: ' + this.answer1 + '\n', '2: ' + this.answer2 + '\n', '3: ' + this.answer3 + '\n', '4: ' + this.answer4);
};

Question.prototype.checkAnswer = function(indexOfAnswer) {

    if (indexOfAnswer - 1 === this.indexOfRightAnswer ) {
        score++;
    }

    var respons = indexOfAnswer - 1 === this.indexOfRightAnswer ? 'Correct!! Your score is now ' + score : 'Wrong :c Your score is ' + score;
    console.log(respons);
};

var questions = [

    new Question(
        "What is norway's longest fjord?",
        "Hardangerfjorden",
        "Oslofjorden",
        "Sognefjorden",
        "Geirangerfjorden",
        2),

   new Question(
    "Sweden's longest river is?",
    "Torne",
    "Kalix",
    "Lule",
    "Ume",
    0),

new Question(
    "In what county do you find Stonehenge?",
    "Staffordshire",
    "Wiltshire",
    "Cornwall",
    "Herefordshire",
    1),

new Question(
    "What scottish city is known as 'The Granite City'?",
    "Perth",
    "Aberdeen",
    "Dundee",
    "Stirling",
    1),

new Question(
    "Name japan's highest mountain",
    "Mount Kita",
    "Mount Hotakadake",
    "Mount Yari",
    "Mount Fuji",
    3),

new Question(
    "When was the prime minister Olof Palme killed?",
    "1980",
    "1982",
    "1984",
    "1986",
    3),

new Question(
    "Who was the previous king of England?",
    "George VI",
    "Henry VII",
    "William IV",
    "Edward VII",
    0),

new Question(
    "What was Sir William Wallice's weapon of choice?",
    "A bow",
    "A spear",
    "A sword",
    "An axe",
    2),

new Question(
    "What period came after the Meiji era?",
    "The Edo period",
    "The Taisho period",
    "The Showa period",
    "The Heisei period",
    1)

];

nextQuestion();

function nextQuestion() {

    var randomQuiz = questions[(Math.floor(Math.random() * questions.length))];

    randomQuiz.displayQuestion();

    var input = prompt('Please select the correct answer by typing inn the corresponding number');

    randomQuiz.checkAnswer(input);

    if (input !== 'exit') {
        nextQuestion();
    }
}



