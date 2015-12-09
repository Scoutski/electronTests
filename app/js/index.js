'use strict';

var lazy = require('lazy');
var fs = require('fs');

var path = __dirname + '/data/file.txt';
var fileData;

var readFile = function() {
  document.getElementsByClassName('fileContent')[0].innerHTML = "";
  if (fs.existsSync(path)) {
    console.log('Found file');
    new lazy(fs.createReadStream(__dirname + '/data/file.txt'))
      .lines
      .forEach(function(line) {
        if (line) {
          console.log(line.toString());
          var contentDiv = document.getElementsByClassName('fileContent')[0];
          contentDiv.innerHTML = contentDiv.innerHTML + (line.toString() ) + "<br>";
        } else {
          console.log('file is empty');
        };
      });
  } else {
    console.log('no file found');
  };
};

var textField = document.getElementsByClassName('inputField')[0];

textField.addEventListener("keydown", function(e) {
  var data = (this.value + '\n');
  if(e.keyCode == 13 && (this.value !== "")) {
    fs.appendFile(path, data, function(error) {
      if (error) {
        console.error("write error:  " + error.message);
      } else {
        console.log(data + " was successfully written to " + path);
      };
    });
    readFile();
  };
});

readFile();
