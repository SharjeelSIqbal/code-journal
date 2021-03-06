/* global data */
/* exported data */

var $title = document.querySelector('#note-title');
var $urlInput = document.querySelector('#url');
var $notes = document.querySelector('#entry-notes');
var $submit = document.querySelector('form');
var $ul = document.querySelector('ul');
var $editEntryFormTitles = document.querySelectorAll('form>h1');
var $delete = document.querySelector('.delete');
var $modal = document.querySelector('#modal');

function setImage(event) {
  var image = document.querySelector('#form-image');
  image.setAttribute('src', $urlInput.value);
}

$urlInput.addEventListener('input', setImage);

function submitForm(event) {
  event.preventDefault();

  var entryList = document.querySelector('ul');
  var noEntries = document.querySelector('[name="no-entry"');
  if (data.editing !== null) {
    data.entries.splice(data.editing, 1, {
      title: $title.value,
      photoURL: $urlInput.value,
      notes: $notes.value,
      entryId: data.editing
    });
    var li = entryList.querySelector('[data-entry-id="' + data.editing + '"]');
    var editedItem = newEntryCreation(data.editing);
    $ul.replaceChild(editedItem, li);
    $submit.reset();
    data.editing = null;
  } else {
    data.entries.push({
      title: $title.value,
      photoURL: $urlInput.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    });
    data.nextEntryId++;
    $submit.reset();
    entryList.prepend(newEntryCreation(data.entries.length - 1));
  }

  data.editing = null;
  if (data.entries.length !== 0) {
    noEntries.className = 'column-full sans-serif font-size row justify-center align-center hidden';
  }
  switchView('entries');

  document.querySelector('#form-image').setAttribute('src', 'images/placeholder-image-square.jpg');
}
$submit.addEventListener('submit', submitForm);

function newEntryCreation(id) {
  var listItem = document.createElement('li');
  var entryImage = document.createElement('img');
  var columnHalfDiv = document.createElement('div');
  var halfDiv = document.createElement('div');
  var editIcon = document.createElement('a');
  var entryTitle = document.createElement('h3');
  var entryNotes = document.createElement('p');

  listItem.className = 'entry-bottom-margin justify-between row';
  entryImage.className = 'column-half image-padding square-image image-bottom-margin';
  columnHalfDiv.className = 'column-half';
  halfDiv.className = 'row justify-between';
  editIcon.className = 'column-half edit-icon title-margin no-text-decoration edit hidden';
  entryTitle.className = 'entry-title sans-serif input-title-block-margin-reset title-margin';
  entryNotes.className = 'input-font-size sans-serif';

  listItem.setAttribute('data-entry-id', id);
  editIcon.setAttribute('href', '""');
  entryImage.setAttribute('src', data.entries[id].photoURL);
  entryTitle.textContent = data.entries[id].title;
  entryNotes.textContent = data.entries[id].notes;
  editIcon.innerHTML = '&#9998;';

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
  var noEntries = document.querySelector('[name="no-entry"');
  for (var i = data.entries.length - 1; i >= 0; i--) {
    entryList.appendChild(newEntryCreation(i));
  }
  if (data.entries.length !== 0) {
    noEntries.className = 'column-full sans-serif font-size row justify-center align-center hidden';
  }
}
window.addEventListener('DOMContentLoaded', loadPage);

function switchViewEvent(event) {
  event.preventDefault();
  if (event.target === $newEntry && data.editing === null) {
    $editEntryFormTitles[1].className = 'bold title-form column-full hidden';
    $editEntryFormTitles[0].className = 'bold title-form column-full';
  }
  var dataView = event.target.getAttribute('data-view');
  switchView(dataView);
}
function switchView(string) {

  var switching = document.querySelectorAll('.tab-view');
  for (var i = 0; i < switching.length; i++) {
    if (switching[i].getAttribute('data-view') === string) {
      switching[i].className = 'tab-view';
      $editEntryFormTitles[0].className = 'bold title-form column-full';
      $editEntryFormTitles[1].className = 'hidden';
      $submit.reset();
      data.editing = null;
      $delete.className = 'delete hidden';
    } else {
      switching[i].className = 'tab-view hidden';
    }
  }
}
var $entriesLink = document.querySelector('.tab');
var $newEntry = document.querySelector('.new');
$entriesLink.addEventListener('click', switchViewEvent);
$newEntry.addEventListener('click', switchViewEvent);

function editNotes(event) {
  var $listAll = document.querySelectorAll('.edit');
  var deleteLink = document.querySelector('#delete-link');
  deleteLink.className = 'justify-between row column-full';
  for (var i = 0; i < $listAll.length; i++) {
    var li = $listAll[i].closest('li');
    var $dataEntryId = li.getAttribute('data-entry-id');
    var $edit = li.querySelector('.edit');

    if ($edit.className === 'edit-icon title-margin no-text-decoration edit') {
      $edit.className = 'edit-icon title-margin no-text-decoration edit hidden';
    }

    if (li === event.target.closest('li')) {
      $edit.className = 'edit-icon title-margin no-text-decoration edit';
    }

    if (event.target === $edit) {
      event.preventDefault();
      switchView('entry-form');
      $delete.className = 'delete';
      $editEntryFormTitles[0].className = 'bold title-form column-full hidden';
      $editEntryFormTitles[1].className = 'bold title-form column-full';
      $title.value = data.entries[parseInt($dataEntryId)].title;
      $urlInput.value = data.entries[parseInt($dataEntryId)].photoURL;
      $notes.value = data.entries[parseInt($dataEntryId)].notes;
      data.editing = parseInt($dataEntryId);
    }
  }
}
$ul.addEventListener('click', editNotes);

function modalAppear(event) {
  event.preventDefault();
  $modal.className = '';
}

function deleteEntry(event) {

  var $cancel = document.querySelector('.cancel');
  var $confirm = document.querySelector('.confirm');
  if (event.target === $confirm) {
    var li = document.querySelector('[data-entry-id="' + data.editing + '"]');
    data.entries.splice(data.editing, 1);
    li.remove($ul);
    $submit.reset();
    $modal.className = 'hidden';
    $delete.className = 'delete hidden';
    switchView('entries');
  }
  if (event.target === $cancel) {
    $modal.className = 'hidden';
  }
}
$modal.addEventListener('click', deleteEntry);
$delete.addEventListener('click', modalAppear);
