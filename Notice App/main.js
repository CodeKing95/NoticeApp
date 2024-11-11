const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".save-note");
const deleteButtonEl = document.querySelector(".delete-one");
const newNoteButtonEl = document.querySelector(".create-new");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");

saveButtonEl.addEventListener("click", clickSaveButton);
newNoteButtonEl.addEventListener("click", newNote);
deleteButtonEl.addEventListener("click", clickDeleteButton);

displayNoteList();
applyListeners();

function applyListeners() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");

  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      selectNote(noteEntry.getAttribute("data-id"))
    );
  });
}

function displayNoteList() {
  const note = getNote();

  const sortedNote = note.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated
  );

  let html = "";

  sortedNote.forEach((note) => {
    html += `
        <div class="note-entry" data-id="${note.id}">
            <div class="note-title">${note.title}</div>
            <div class="note-content-teaser">
            ${note.content}
            </div>
            <div class="note-date">${new Date(note.lastUpdated).toLocaleString(
              "en-US"
            )}</div>
          </div>
          `;
  });

  notesListEl.innerHTML = html;
}
function clickSaveButton() {
  const title = titleInputEl.value;
  const content = contentInputEl.value;

  if (!title || !content) {
    alert("Please enter  a title.");
    return;
  }

  saveNote(title, content, Number(getCurrentleySelectedId()));

  titleInputEl.value = "";
  contentInputEl.value = "";

  displayNoteList();
  applyListeners();
}

function clickDeleteButton() {
  const currentlySelectedNoteEl = getCurrentleySelectedId();

  if (!currentlySelectedNoteEl) return;

  selectNote(getCurrentleySelectedId);

  titleInputEl.value = "";
  contentInputEl.value = "";

  displayNoteList();
  applyListeners();
}

function selectNote(id) {
  const selectNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);

  if (selectNoteEl.classList.contains("selected-note")) return;

  removeSelectedClassFromAllNotes();

  selectNoteEl.classList.add("selected-note");

  const note = getNote();

  const selectNote = note.find((note) => note.id === Number(id));

  if (!selectNote) return;

  titleInputEl.value = selectNote.title;
  contentInputEl.value = selectNote.content;
}

function newNote() {
  titleInputEl.value = "";
  content.InputEl.value = "";

  removeSelectedClassFromAllNotes();
}

function removeSelectedClassFromAllNotes() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });
}

function getCurrentleySelectedId() {
  let currentId = undefined;

  const currentlySelectedNoteEl = document.querySelectorAll(".selected-note");

  if (currentlySelectedNoteEl) {
    currentId = currentlySelectedNoteEl.getAttribute("data-id");
  }

  return currentId;
}
