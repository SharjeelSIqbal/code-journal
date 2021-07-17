/* global data */
/* exported data */

// User can create new entry *START*
var $title = document.querySelector('#note-title');
var $urlInput = document.querySelector('#url');
var $notes = document.querySelector('#entry-notes');
var $submit = document.querySelector('form');
var $ul = document.querySelector('ul');

function setImage(event) {

  var image = document.querySelector('#form-image');
  image.setAttribute('src', $urlInput.value);
}

$urlInput.addEventListener('blur', setImage);

function submitForm(event) {
  event.preventDefault();
  data.entries.push({
    title: $title.value,
    photoURL: $urlInput.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  });
  data.nextEntryId++;
  $submit.reset();
  var entryList = document.querySelector('ul');
  entryList.prepend(newEntryCreation(data.entries.length - 1));

  var noEntries = document.querySelector('[name="no-entry"');
  if (data.entries.length !== 0) {
    noEntries.className = 'column-full sans-serif font-size row justify-center align-center hidden';
  }
  switchView('entries');

  document.querySelector('#form-image').setAttribute('src', 'images/placeholder-image-square.jpg');
}
$submit.addEventListener('submit', submitForm);

// New entry *END*

// For Dom Creation *START*
function newEntryCreation(id) {
  var listItem = document.createElement('li');
  listItem.className = 'entry-bottom-margin justify-between row';
  listItem.setAttribute('data-entry-id', id);
  var entryImage = document.createElement('img');
  entryImage.className = 'column-half image-padding square-image image-bottom-margin';
  var columnHalfDiv = document.createElement('div');
  columnHalfDiv.className = 'column-half';
  var halfDiv = document.createElement('div');
  halfDiv.className = 'row justify-between';
  var editIcon = document.createElement('a');
  editIcon.className = 'edit-icon title-margin no-text-decoration edit hidden';
  editIcon.innerHTML = '&#9998;';
  editIcon.setAttribute('href', '""');
  var entryTitle = document.createElement('h3');
  entryTitle.className = 'entry-title sans-serif input-title-block-margin-reset title-margin';
  var entryNotes = document.createElement('p');
  entryNotes.className = 'input-font-size sans-serif';

  entryImage.setAttribute('src', data.entries[id].photoURL);
  entryTitle.textContent = data.entries[id].title;
  entryNotes.textContent = data.entries[id].notes;

  listItem.appendChild(entryImage);
  listItem.appendChild(columnHalfDiv);
  columnHalfDiv.appendChild(halfDiv);
  halfDiv.appendChild(entryTitle);
  halfDiv.appendChild(editIcon);
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
function switchViewEvent(event) {
  event.preventDefault();
  var dataView = event.target.getAttribute('data-view');
  switchView(dataView);
}
function switchView(string) {

  var switching = document.querySelectorAll('.tab-view');
  for (var i = 0; i < switching.length; i++) {
    if (switching[i].getAttribute('data-view') === string) {
      switching[i].className = 'tab-view';
    } else {
      switching[i].className = 'tab-view hidden';
    }
  }
}
var $entriesLink = document.querySelector('.tab');
var $newEntry = document.querySelector('.new');
$entriesLink.addEventListener('click', switchViewEvent);
$newEntry.addEventListener('click', switchViewEvent);
// Switching Tabs *END*

// Clicking to edit *START*
function editNotes(event) {
  var $listAll = document.querySelectorAll('.edit');
  for (var i = 0; i < $listAll.length; i++) {
    var li = $listAll[i].closest('li');
    var $edit = li.querySelector('.edit');
    if ($edit.className === 'edit-icon title-margin no-text-decoration edit') {
      $edit.className = 'edit-icon title-margin no-text-decoration edit hidden';
    }
    if (li === event.target.closest('li')) {
      $edit.className = 'edit-icon title-margin no-text-decoration edit';
    }
  }

}
$ul.addEventListener('click', editNotes, true);
