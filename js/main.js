/* global data */
/* exported data */
var $title = document.querySelector('#note-title');
var $urlInput = document.querySelector('#url');
var $notes = document.querySelector('#entry-notes');
var $submit = document.querySelector('form');

function setImage(event) {

  document.querySelector('img').setAttribute('src', $urlInput.value);
}

$urlInput.addEventListener('blur', setImage);

function resetForm(event) {
  data.entries.push({
    title: $title.value,
    photoURL: $urlInput.value,
    notes: $notes.value
  });

  $title.value = '';
  $urlInput.value = '';
  $notes.value = '';
  document.querySelector('img').setAttribute('src', 'images/placeholder-image-square.jpg');
  event.preventDefault();

}

$submit.addEventListener('submit', resetForm);
function getPreviousEntries(event) {
  return localStorage.setItem('note-pages', JSON.stringify(data));
}

var previousEntries = localStorage.getItem('note-pages');
if (previousEntries !== null) {
  previousEntries = JSON.parse(previousEntries);
  data.entries = previousEntries.entries;
  if (previousEntries.entries.length !== 1) {
    data.nextEntryId = previousEntries.entries.length;
  }
}
$submit.addEventListener('submit', getPreviousEntries);
