require("./lib/social");
require("./lib/ads");
var track = require("./lib/tracking");

var $ = require("jquery");
var ich = require("icanhaz");
var Share = require("share");
// var questionTemplate = require("./_questionTemplate.html");
// var resultTemplate = require("./_resultTemplate.html");
// var overviewTemplate = require("./_overviewTemplate.html");

var score = 0;
var id = 1;

// Set up templates
// ich.addTemplate("questionTemplate", questionTemplate);
// ich.addTemplate("resultTemplate", resultTemplate);
// ich.addTemplate("overviewTemplate", overviewTemplate);

var Share = require("share");
new Share(".share-button", {
  description: "Think you can pronounce the names of Washington places? Test your local knowledge with our quiz.",
  image: "http://projects.seattletimes.com/2015/pronunciation-quiz/assets/fb_sequim.JPG",
  ui: {
    flyout: "top center"
  },
  networks: {
    email: {
      description: "Think you can pronounce the names of Washington places? Test your local knowledge with our quiz. http://apps-stage.seattletimesdata.com/extensive-voodoo/"
    }
  }
});

//create new question from template
var showQuestion = function(questionId) {
  $(".question-box").html(`
    <div class="inner">
      <div class="map">
        <img src="./assets/map/{{image}}">
      </div>

      <div class="question-inner">
        <div class="question">
          <div class="index"></div>
          How do you say ... <span class="highlight">{{place}}?</span></div>

        {{#answers}}
          <p class="option">
            <input type="radio" value="{{correct}}" name="answer" id="{{id}}">
            <label for="{{id}}">{{answer}}</label> <i class="listen fa fa-volume-up"></i>
            <audio src="./assets/new/{{audio}}"></audio>
          </p>
        {{/answers}}

        <button class="submit" disabled><i class="fa fa-check"></i> Submit</button>
      </div>
    </div>
  `);
  $(".index").html(id + " of " + Object.keys(quizData).length);
};

// show submit button when answer is selected
var watchInput = function() {
  $(".quiz-box").on("click", "input", (function(){
    $(".submit").addClass("active");
    $(".submit").attr("disabled", false);
  }));
};

$(".quiz-container").on("click", ".submit", function() {
  // score answer
  var answerData = {};
  answerData.place = quizData[id].place;
  var correct = $("input:checked").val();
  if (correct) { 
    score += 1;
    answerData.hooray = true;
  }

  // keep track of selected answer
  quizData[id].answers.forEach(function(a) {
    if (a.correct) {
      answerData.correct = a.answer;
      answerData.audio = a.audio;
      answerData.image = quizData[id].image;
      answerData.description = quizData[id].desc;
    }
  });

  $(".question-box").html(`
    <div class="inner">
      <div class="map">
        <img src="./assets/map/{{image}}">
      </div>

      <div class="question-inner">
        <div class="answer">
          <div class="index"></div>
          <span class="highlight correct">{{#hooray}}Right!{{/hooray}}</span>
          <span class="highlight wrong">{{^hooray}}Wrong.{{/hooray}}</span>

          <div class="answer-box">
            <span class="correct-answer">
              {{place}} is pronounced “{{correct}}” <i class="listen fa fa-volume-up"></i>
              <audio src="./assets/{{audio}}"></audio>
            </span>
            <div class="description">{{description}}</div>
          </div>
        </div>

        <button class="next active">Next question <i class="fa fa-arrow-right"></i></button>
      </div>
    </div>
  `);
  $(".index").html(id + " of " + Object.keys(quizData).length);

  // Change button text on last question
  if (id == Object.keys(quizData).length) {
    $(".next").html("See results");
  }
  watchNext();
});


var watchNext = function() {
  $(".next").click(function() {
    if (id < Object.keys(quizData).length) {
      // move on to next question
      id += 1;
      showQuestion(id);
      $(".next").removeClass("active");
      $(".next").attr("disabled", true);
    } else {
      calculateResult();
    }
  });
};

var calculateResult = function() {
  for (var index in resultsData) {
    var result = resultsData[index];
    if (score >= result.min && score <= result.max) {
      // display result
      result.score = score;
      if (result.score > 5) { 
        result.color = "#589040"
      } else if (result.score > 2) { 
        result.color = "#F5AE3F"
      } else {
        result.color = "#DE5636"
      }
      new Share(".share-results", {
        description: "I scored " + result.score + "/12! Think you can pronounce the names of these Washington places?",
        image: "http://projects.seattletimes.com/2015/pronunciation-quiz/assets/fb_sequim.JPG",
        ui: {
          flyout: "bottom right"
        },
        networks: {
          email: {
            description: "I scored " + result.score + "/12! Think you can pronounce the names of these Washington places? http://apps-stage.seattletimesdata.com/extensive-voodoo/"
          }
        }
      });
      $(".question-box").html(`
        <div class="overview inner">
          <p class="result-name">You scored <span class="result" style="color: {{color}}">{{score}}/12</span>. Your level: <span class="result" style="color: {{color}}">{{title}}</span>.

          <p class="result-description">{{description}}

          <div class="results-image">
            <img src="./assets/results/{{image}}">
            <p class="photo-credit">{{photographer}} / The Seattle Times</p>
          </div>
        </div>
      `);
    }
  }
};

showQuestion(id);
watchInput();
