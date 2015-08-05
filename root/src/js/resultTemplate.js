module.exports = function (answer) {
	return `
    <div class="inner">
      <div class="map">
        <img src="./assets/map/${answer.image}">
      </div>

      <div class="question-inner">
        <div class="answer">
          <div class="index"></div>
          <span class="highlight correct">Right!</span>
          <span class="highlight wrong">Wrong.</span>

          <div class="answer-box">
            <span class="correct-answer">
              ${answer.place} is pronounced “${answer.correct}” <i class="listen fa fa-volume-up"></i>
              <audio src="./assets/{{audio}}"></audio>
            </span>
            <div class="description">${answer.description}</div>
          </div>
        </div>

        <button class="next active">Next question <i class="fa fa-arrow-right"></i></button>
      </div>
    </div>
  `
};