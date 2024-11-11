const LOCAL_STORAGE_KEY = "noticeapp-notice";

function getNote() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content, id = undefined) {
  alert(id);
  const note = getNote();

  if (!id) {
    note.push({
      title,
      content,
      id: getNextId(),
      lastUpdated: new Date().getTime(),
    });
  } else {
    const indexOfNoteWithId = note.findIndex((note) => note.id === id);

    if (indexOfNoteWithId > -1) {
      note[indexOfNoteWithId] = {
        title,
        content,
        id,
        lastUpdated: new Date().getTime(),
      };
    }
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(note));
}

function deleteNote(id) {
  if (!id) return;

  const note = getNote();

  const filteredNote = note.filter((note) => note.id !== Number(id));

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredNotenote));
}

function getNextId() {
  const note = getNote();

  const sortedNote = note.sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNote) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }
  return nextId;
}
