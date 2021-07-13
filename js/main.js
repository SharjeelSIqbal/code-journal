/* global data */
/* exported data */
var $title = document.querySelector('#note-title');
var $urlInput = document.querySelector('#url');
var $notes = document.querySelector('#entry-notes');
var $submit = document.querySelector('button');
var notes = [];

function setImage(event) {

  document.querySelector('img').setAttribute('src', $urlInput.value);
}

$urlInput.addEventListener('input', setImage);

function resetForm(event) {
  notes.push({
    title: $title.value,
    photoURL: $urlInput.value,
    notes: $notes.value
  });

  $title.value = '';
  $urlInput.value = '';
  $notes.value = '';
  document.querySelector('img').setAttribute('src', 'images/placeholder-image-square.jpg');
  return notes;
}

$submit.addEventListener('click', resetForm);

function storeData(event) {

  return localStorage.setItem('notepages', JSON.stringify(notes));

}
var oldEntries = localStorage.getItem('notepages');
if (oldEntries !== null) {
  notes = JSON.parse(oldEntries);
}
window.addEventListener('beforeunload', storeData);
