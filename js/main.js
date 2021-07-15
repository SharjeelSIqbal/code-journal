/* global data */
/* exported data */

// User can create new entry *START*
var $title = document.querySelector('#note-title');
var $urlInput = document.querySelector('#url');
var $notes = document.querySelector('#entry-notes');
var $submit = document.querySelector('form');

function setImage(event) {

  var image = document.querySelector('#form-image');
  image.setAttribute('src', $urlInput.value);
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

  document.querySelector('#form-image').setAttribute('src', 'images/placeholder-image-square.jpg');

}

$submit.addEventListener('submit', resetForm);
// New entry *END*

// For Dom Creation *START*
function newEntryCreation(id) {
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

  entryImage.setAttribute('src', data.entries[id].photoURL);
  entryTitle.textContent = data.entries[id].title;
  entryNotes.textContent = data.entries[id].notes;

  listItem.appendChild(listFlex);
  listFlex.appendChild(entryImage);
  listFlex.appendChild(columnHalfDiv);
  columnHalfDiv.appendChild(entryTitle);
  columnHalfDiv.appendChild(entryNotes);

  return listItem;
}

function loadPage(event) {
  var entryList = document.querySelector('ul');
  for (var i = data.entries.length - 1; i >= 0; i--) {
    entryList.appendChild(newEntryCreation(i));
  }
  var noEntries = document.querySelector('[name="no-entry"');
  if (data.entries.length !== 0) {
    noEntries.className = 'column-full sans-serif font-size row justify-center align-center hidden';
  }

}
window.addEventListener('DOMContentLoaded', loadPage);

// DOM Creation *END*

// Switch Tabs *START*
function switchView(event) {
  event.preventDefault();
  var dataView = event.target.getAttribute('data-view');
  var switching = document.querySelectorAll('.tab-view');
  for (var i = 0; i < switching.length; i++) {
    if (switching[i].getAttribute('data-view') === dataView) {
      switching[i].className = 'tab-view';
    } else {
      switching[i].className = 'tab-view hidden';
    }
  }
  if (event.target === $submit) {
    switching[0].className = 'tab-view';
    switching[1].className = 'tab-view hidden';
  }
}

var entriesLink = document.querySelector('.tab');
var newEntry = document.querySelector('.new');
entriesLink.addEventListener('click', switchView);
newEntry.addEventListener('click', switchView);
$submit.addEventListener('submit', switchView);
// Switching Tabs *END*

// New entry appearance and switching tabs after submitting
//* START*
function newAddition(event) {
  var entryList = document.querySelector('ul');
  entryList.prepend(newEntryCreation(data.entries.length - 1));

  var noEntries = document.querySelector('[name="no-entry"');
  if (data.entries.length !== 0) {
    noEntries.className = 'column-full sans-serif font-size row justify-center align-center hidden';
  }
}
$submit.addEventListener('submit', newAddition);
// New entry appearance and switching tabs after submitting
//* END*
