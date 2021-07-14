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
