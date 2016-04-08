var exec = require("child_process").exec;
var path = require("path");

exports.description = "A standard starting-point for news quiz development at the Seattle Times."
exports.template = function(grunt, init, done) {
  //prelims
  var here = path.basename(process.cwd());

  //process
  init.process(init.defaults, [
    init.prompt("author_name"),
    init.prompt("app_name", here),
    init.prompt("app_description"),
    { name: "quiz_type", message: "Quiz type (\"trivia\", \"personality\")", default: "trivia" },
    init.prompt("spreadsheet_id")
  ], function(err, props) {
    //add environment variables, dynamic properties
    props.github_repo = "seattletimes/" + here;
    props.s3_path = [new Date().getFullYear(), "quizzes", props.app_name].join("/");

    var root = init.filesToCopy(props);
    init.copyAndProcess(root, props, {noProcess: "src/assets/**"});
    grunt.file.mkdir("data");
    grunt.file.mkdir("./src/assets/quiz");
    grunt.file.mkdir("./src/assets/results");
    grunt.file.mkdir("./src/assets/elsewhere");

    //install node modules
    console.log("Installing Node modules...");
    exec("npm install --cache-min 999999", done);
  });
};