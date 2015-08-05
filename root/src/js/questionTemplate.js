module.exports = function (question) {
	return `
    <div class="inner">
      <div class="map">
        <img src="./assets/map/${question.image}">
      </div>

      <div class="question-inner">
        <div class="question">
          <div class="index"></div>
          How do you say ... <span class="highlight">${question.place}?</span></div>

        {{#answers}}
          <p class="option">
            <input type="radio" value="${question.correct}" name="answer" id="${question.id}">
            <label for="${question.id}">${question.answer}</label> <i class="listen fa fa-volume-up"></i>
          </p>
        {{/answers}}

        <button class="submit" disabled><i class="fa fa-check"></i> Submit</button>
      </div>
    </div>
  `
};