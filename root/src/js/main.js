require("./lib/social");
require("./lib/ads");
var track = require("./lib/tracking");

{% if (quiz_type == "personality")  { %}
  require("./personality");
{% } else { %}
  require("./trivia");
{% } %}