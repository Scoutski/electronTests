'use strict';

var lazy = require('lazy');
var fs = require('fs');

console.log(__dirname + '/data/file.txt');

if (fs.existsSync(__dirname + '/data/file.txt')) {
  console.log('Found file');
  new lazy(fs.createReadStream(__dirname + '/data/file.txt'))
    .lines
    .forEach(function(line){
      console.log(line);
      console.log(line.toString());
      var contentDiv = document.getElementsByClassName('fileContent')[0];
      contentDiv.innerHTML = contentDiv.innerHTML + (line.toString() ) + "<br>";
    });
} else {
  console.log('no file found');
};
