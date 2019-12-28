/* when a user clicks on start quiz button */
function startQuiz() {
    $('#startButton').on('click', function(event) {
        generateQuestion();
        $('.altBox').hide();
        $('.introQuiz').on('click', '.startButton', function(event) {
            $('.introQuiz').hide();
            questionNumber++;
            $('.questionBox').show();
            $('.questionBox').prepend(generateQuestion());
        });
    });
}

/* Displays question number and score obtained */
function updateQuestionScore() {
    const html = $(`<ul>
        <li id="js-answered">Question ${STORE.currentQuestion + 1}  of ${STORE.questions.length}</li>
        <li id="js-score">Score ${STORE.currentScore} points </li>
      </ul>`);
    $(".current-question-score").html(html);
}

/* Displays the options for the current question */
function updateOptions() {
    let question = STORE.questions[STORE.currentQuestion];
    for (let i = 0; i < question.options.length; i++) {
        $('.js-options').append(`<input type="radio" name="options" id="option${i + 1}" tabindex="${i + 1}" value="${question.options[i]}">
          <label for="options${i +1}">
              ${question.options[i]}
          </label>
          <br>
          <span id="js-r${i + 1}"></span>`);
    }
}

/*displays the question*/
function generateQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionScore();
    const questionHtml = $(`
    <div>
      <form id="js-questions" class="question-form">
        <fieldset>
          <div class="quizBox">
                  <div class="theQuizBox">
              <legend> ${question.question}</legend>
            </div>
          </div>
          <div class="quizBox">
                  <div class="theQuizBox">
              <div class="js-options"> </div>
          </div>
        </div>
      
  
        <div class="quizBox">
                  <div class="theQuizBox">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
            <button type = "button" id="next-question" tabindex="6"> Next >></button>
          </div>
        </div>
      </fieldset>
      </form>
    </div>`);
    $("main").html(questionHtml);
    updateOptions();
    $("#next-question").hide();
}

/* displays results and restart quiz button */
function displayResults() {
    let resultHtml = $(
        `<div class="results">
        <form id="js-restart-quiz">
          <fieldset>
            <div class="quizBox">
                  <div class="theQuizBox">
                <legend>Your score is ${STORE.currentScore} points out of ${STORE.questions.length} points </br><img src="images/milanrunway.jpg"  alt="fashion police" width="350"></legend>
              </div>
            </div>
          
           <div class="quizBox">
                  <div class="theQuizBox">
                <button type="button" id="restart"> Restart Quiz </button>
              </div>
            </div>
          </fieldset>
      </form>
      </div>`);
    STORE.currentQuestion = 0;
    STORE.currentScore = 0;
    $("main").html(resultHtml);
    // resetStats();
}

/* checks whether it reached the end of questions list */
function moveAlong() {
    $('body').on('click', '#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length ? displayResults() : generateQuestion();
    });
}


/*checks whether the chosen option is right or wrong and displays respective message*/
function handleQuestionResponse() {

    $('body').on("submit", '#js-questions', function(event) {
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val();
        if (!selectedOption) {
            alert("Choose an option");
            return;
        }
        //this is not working?
        let id_num = currentQues.options.findIndex(i => i === selectedOption);
        let id = "#js-r" + ++id_num;
        $('span').removeClass("right-answer wrong-answer");
        if (selectedOption === currentQues.answer) {
            STORE.currentScore++;
            $('.js-options').append(`<br/><img src="images/toomuchfashion.jpg" alt="too much fashion" width="250" height="125"><br/><br/>You got it right!<br/> `);
            $(`${id}`).addClass("right-answer");
        } else {
            $('.js-options').append(`<br/>You got it wrong <br/> Call the Fashion police!<br/><br/><img src="images/fashionpolice.jpg" alt="fashion police" width="250"> <br/><br/>The answer is ${currentQues.answer}<br/>`);
            $(`${id}`).addClass("wrong-answer");
        }

        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.currentScore} points`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $('#next-question').show();
    });
}

function restartQuiz() {
    $('body').on('click', '#restart', (event) => {
        generateQuestion();
    });
}

function handleQuizApp() {
    startQuiz();
    moveAlong();
    handleQuestionResponse();
    restartQuiz();
}

$(handleQuizApp);