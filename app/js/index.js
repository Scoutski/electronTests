'use strict';

var lazy = require('lazy');
var fs = require('fs');
var PouchDB = require('pouchdb');
var db = new PouchDB((__dirname + '/data/hsdb'), { adapter: 'leveldb' })
var currentProfile;

console.log(__dirname + '/data/hsdb');

var addComment = function(comment) {
  if (currentProfile) {
    db.post({
      profile: currentProfile,
      text: comment,
    });
  }
};

var addProfile = function(name) {
  db.post({
    id: name
  });
};

// for (var i = min; i<=max; i++){
//   var opt = document.createElement('option');
//   opt.value = i;
//   opt.innerHTML = i;
//   select.appendChild(opt);
// }

db.changes({
  live: true,
  include_docs: true
}).on('change', function(change) {
  if (!change.doc.text) return;
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows);
  });
});

var textField = document.getElementsByClassName('inputField')[0];

textField.addEventListener("keydown", function(e) {
  var data = (this.value);
  if(e.keyCode == 13 && (this.value !== "")) {
    addComment(data);
  };
});

var addProfileButton = document.getElementsByClassName('addProfileButton')[0];

addProfileButton.addEventListener('click', function(event) {
  event.preventDefault();
  var profileName = prompt("Please enter a profile name", "Enter profile name...");
  if (profileName != null) {
    addProfile(profileName);
  }
}, false);
