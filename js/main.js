/* global data */
/* exported data */
var $title = document.querySelector('#note-title');
var $urlInput = document.querySelector('#url');
var $notes = document.querySelector('#entry-notes');
var $submit = document.querySelector('button');
var oldEntries;
function setImage(event) {

  document.querySelector('img').setAttribute('src', $urlInput.value);
}

$urlInput.addEventListener('input', setImage);

function resetForm(event) {
  data.entries = oldEntries.entries;
  data.entries.push({
    title: $title.value,
    photoURL: $urlInput.value,
    notes: $notes.value
  });
  data.nextEntryId = oldEntries.nextEntryId;
  data.nextEntryId += 1;

  $title.value = '';
  $urlInput.value = '';
  $notes.value = '';
  document.querySelector('img').setAttribute('src', 'images/placeholder-image-square.jpg');
  return data;
}

$submit.addEventListener('click', resetForm);

function storeData(event) {
  return localStorage.setItem('notepages', JSON.stringify(data));

}
oldEntries = localStorage.getItem('notepages');
if (oldEntries !== null) {
  oldEntries = JSON.parse(oldEntries);
}

window.addEventListener('beforeunload', storeData);
