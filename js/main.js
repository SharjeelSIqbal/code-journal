/* global data */
/* exported data */

// User can create new entry *START*
var $title = document.querySelector('#note-title');
var $urlInput = document.querySelector('#url');
var $notes = document.querySelector('#entry-notes');
var $submit = document.querySelector('form');

function setImage(event) {

  document.querySelector('img').setAttribute('src', $urlInput.value);
}

$urlInput.addEventListener('blur', setImage);

function resetForm(event) {
  event.preventDefault();
  data.entries.push({
    title: $title.value,
    photoURL: $urlInput.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  });
  data.nextEntryId++;
  $submit.reset();
  document.querySelector('img').setAttribute('src', 'images/placeholder-image-square.jpg');

}

$submit.addEventListener('submit', resetForm);
// New entry *END*

// For Dom Creation *START*
function newEntryCreation(entries, idNumber) {
  var listItem = document.createElement('li');
  listItem.className = 'entry-bottom-margin';
  var listFlex = document.createElement('div');
  listFlex.className = 'justify-between row';
  var entryImage = document.createElement('img');
  entryImage.className = 'column-half image-padding square-image image-bottom-margin';
  var columnHalfDiv = document.createElement('div');
  columnHalfDiv.className = 'column-half';
  var entryTitle = document.createElement('h3');
  entryTitle.className = 'entry-title sans-serif input-title-block-margin-reset title-margin';
  var entryNotes = document.createElement('p');
  entryNotes.className = 'input-font-size sans-serif';

  listItem.appendChild(listFlex);
  listFlex.appendChild(entryImage);
  listFlex.appendChild(columnHalfDiv);
  columnHalfDiv.appendChild(entryTitle);
  columnHalfDiv.appendChild(entryNotes);
  entryImage.setAttribute('src', data.entries[idNumber].photoURL);
  entryTitle.textContent = data.entries[idNumber].title;
  entryNotes.textContent = data.entries[idNumber].notes;
  return listItem;
}
var entryList = document.querySelector('ul');
for (var i = data.entries[data.entries.length - 1].entryId; i >= 0; i--) {
  entryList.appendChild(newEntryCreation(data.entries, i));
}
// Dom Creation *END*
