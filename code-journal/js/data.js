/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function getPreviousEntries(event) {
  return localStorage.setItem('note-pages', JSON.stringify(data));
}

var previousEntries = localStorage.getItem('note-pages');
if (previousEntries !== null) {
  previousEntries = JSON.parse(previousEntries);
  data = previousEntries;
}
window.addEventListener('beforeunload', getPreviousEntries);
