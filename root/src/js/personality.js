var $ = require("jquery");
var ich = require("icanhaz");
var Share = require("share");

var questionTemplate = require("./_questionTemplate.html");
var overviewTemplate = require("./_overviewPersonalityTemplate.html");

var scores = {};
var id = 1;

// Set up templates
ich.addTemplate("questionTemplate", questionTemplate);
ich.addTemplate("overviewTemplate", overviewTemplate);

new Share(".share-button", {
  ui: {
    flyout: "bottom left"
  }
});

//create new question from template
var showQuestion = function(id) {
  $(".question-box").html(ich.questionTemplate(quizData[id]));
  $(".index").html(id + " of " + Object.keys(quizData).length);
};

// show next button when answer is selected
var watchInput = function() {
  $(".quiz-box").on("click", "input", (function(){
    $(".submit").addClass("active");
    $(".submit").attr("disabled", false);
  }));
};

var watchNext = function() {
  $(".question-box").on("click", ".submit", function() {
    // score answer
    var options = $("input:checked").val().split(" ");
    options.forEach(function(option) {
      if (option === "") return;
      if (!scores[option]) { scores[option] = 0 }
      scores[option] += 1;
    });

    if (id < Object.keys(quizData).length) {
      // move on to next question
      id += 1;
      showQuestion(id);
      $(".submit").removeClass("active");
      $(".submit").attr("disabled", true);
      // Change button text on last question
      if (id == Object.keys(quizData).length) {
        $(".submit").html("Finish");
      }
    } else {
      calculateResult();
    }
  });
};

var calculateResult = function() {
  // find highest match(es)
  var highestScore = 0;
  for (var option in scores) {
    if (scores[option] >= highestScore) {
      highestScore = scores[option];
    }
  }

  //loop again to find ties
  var highestOptions = [];
  for (var option in scores) {
    if (scores[option] == highestScore) {
      highestOptions.push(option);
    }
  }

  var random = Math.round(Math.random() * (highestOptions.length - 1));
  var resultId = highestOptions[random];
  var result;
  resultsData.forEach(function(option) {
    if (option.id != resultId) return;
    result = option;
  });

  // display result
  $(".quiz-box").html(ich.overviewTemplate(result));
  $(".retake").removeClass("hidden");
  new Share(".share-button", {
    description: "I got " + result.player + "! Which Seahawk are YOU?",
    image: result.image,
    ui: {
      flyout: "bottom left",
      button_text: "Share results"
    },
    facebook: {
      caption: "I got " + result.player + "! Which Seahawk are YOU?"
    }
  });
  $(".share-button").addClass("share-results");
};

elsewhereData.forEach(function(story) {
  $(".dont-miss").append(
    `
      <div class="story">
        <div class="padded">
        <a href=${story.link}>
          <img src="./assets/elsewhere/${story.image}"></img>
        </a>
          <div class="small">${story.category}</div>
        <a href=${story.link}>
          <div>${story.title}</div>
        </a>
        </div>
      </div>
    `
  );
});

showQuestion(id);
watchInput();
watchNext();