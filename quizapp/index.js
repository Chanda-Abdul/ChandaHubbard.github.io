//creates and stores variables for the quiz score and question number information
let currentScore = 0;
let currentQuestion = 0;

//generate each quiz questions
function generateQuestion() {
    if (currentQuestion < STORE.length) {
        return createQuestion(currentQuestion);
    } else {
        $('.someAnswerBox').hide();
        finalScore();
        $('.currentQuestion').text(10);
    }
    // let question = STORE.questions[STORE.currentQuestion];
    // updateScoreAndQuestion();
    // const questionHTML = $(`<div><form id="js-questions" class ="question-form"><fieldset><div class="row question"><div class="col-12"><legend>${question.question}</legend></div></div><div class="row options"><div class="col-12"><div class="js-options"></div></div></div><div class="row"><div class="col-12"><button type="submit" id="answer" tabindex="5">Submit</button><button type="button" id="next-question" tabindex="6"> Next>></button></div></div></fieldset></form></div>`);
    // $("main").html(questionHTML);
    // updateOptions();
    // $("#next-question").hide();
}
//increments the currentScore variable by one and updates the 'score' number text in the quiz view
function updateScore() {
    currentScore++;
    $('.currentScore ').text(currentScore);
}
//increments the currentQuestions variable by one and updates the 'question' number text in the quiz view
function updateQuestion() {
    currentQuestion++;
    $('.currentQuestion').text(currentQuestion + 1);
}


//restarts the quiz and resets the text value of currentScore and currentQuestion to 0, and updates thier respective text in quiz view
function resetQuiz() {
    currentScore = 0;
    currentQuestion = 0;
    $('.currentScore').text(0);
    $('.currentQuestion').text(0);

}


//begins the quiz when a user clicks on the 'start' button
function startQuiz() {
    $('.boxOfQuestion').hide();
    $('.startQuiz').on('click', '.startButton', function(event) {
        $('.startQuiz').hide();
        $('.currentQuestion').text(1);
        $('.someAnswerBox').show();
        $('.someAnswerBox').prepend(generateQuestion());
    });

}

//runs the answer functions
function submitAnswer() {
    $('.backgroundBox').on('submit', function(event) {
        event.preventDefault();
        $('.boxOfQuestion').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[currentQuestion].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

//html template to create question form
function createQuestion(questionIndex) {
    let formMake = $(`<form>
<fieldset>
<legend class="questionText">${STORE[questionIndex].question}</legend>
</fieldset>
</form>`)

    let fieldSelector = $(formMaker).find('fieldset');

    STORE[questionIndex].answers.forEach(function(answerValue, anwserIndex) {
        $(`<label class="scoreCard" for="${answerIndex}"><input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
    <span>${answerValue}</span>
    </label>`).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button">Submit</button>`).appendTo(fieldSelector);
    return formMaker;
}
//allows user to submit a selected answer and checks it against the correct answer

//feedback results if answer is correct
function correctAnwser() {
    $('.response').html(
        `<h3>Your answer is correct!</h3>
        <img src="images/correct.jpg" alt="correct" class="images" width="200px">
        <p class="sscoreCard">You're a smart one!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
}

//feedback if answer is incorrect
function wrongAnswer() {
    $('.response').html(
        `<h3>That's the wrong answer...</h3>
        <img src="images/correct.jpg" alt="correct" class="images" width="200px">
        <p class="scoreCard">It's actually:</p>
        <p class="scoreCard">${STORE[currentQuestion].correctAnswer}</p>
        <button type="button" class="nextButton button">Next</button>`
    );
}

// function updateScoreAndQuestion() {

// }




//generates the next question
function nextQuestion() {
    $('.backgroundBox').on('click', '.nextButton', function(event) {
        $('.boxOfQuestion').hide();
        $('.someAnswerBox').show();
        updateCurrentQuestion();
        $('.someAnswerBox form').replaceWith(generateQuestion());
    });

}
//determines final score and feedback at the end of the quiz
function finalScore() {
    $('.final').show();

    const great = [
        'Good job!',
        'images/win.jpg',
        'cheering',
        'You sure know your fashion designers!',
    ];
    const good = [
        'Good, not great.',
        'images/win.jpg',
        'something else',
        'You should study your fashion designers',
    ];
    const bad = [
        'You dont know fashion',
        'images/win.jpg',
        'something else',
        'You should study your fashion designers',
    ];
    if (currentScore >= 7) {
        array = great;
    } else if (currentScore < 7 && currentScore >= 4) {
        array = good;
    } else {
        array = bad;
    }
    return $('.final').html(`<h3>${array[0]}</h3>
    <img src="${array[1]}" alt="${array[2]}" class="images">
    <h3>Your score is ${currentScore } /10</h3>
    <p class="scoreCard">${array[3]}</p>
    <button type="submit" class="restartButton button">Restart</button>`);
}

//resarts the quiz
function restartQuiz() {
    $('.backgroundBox').on('click', '.resartButton', function(event) {
        event.preventDefault();
        resetStats();
        $('.boxOfQuestion').hide();
        $('.startQuiz').show();
    });
}

//runs the functions
function runQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();


}

$(runQuiz);