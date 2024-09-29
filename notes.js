document.addEventListener("DOMContentLoaded", init);

var notes = [];

function init() {
    console.log("Hallo");
    initNotes(); // Lädt die gespeicherte Notizen, wenn die Seite geladen wird..
}

function neu() {
    const newNote = readNote();
    if (newNote) {
        notes.push(newNote);
        saveToStorage();
        buildNote(newNote);
    }
}

function readNote() {
    const titleInput = document.getElementById("new-title");
    const contentInput = document.getElementById("new-content");
    if (titleInput.value || contentInput.value) {
        const titleText = titleInput.value;
        const contentText = contentInput.value;
        titleInput.value = "";
        contentInput.value = "";
        return { title: titleText, content: contentText };
    }
}

function buildNote(newNote) {
    const { title: newTitle, content: newContent } = newNote;
    if (newTitle || newContent) {
        const container = document.createElement("div");
        container.classList.add("note-container");

        const title = document.createElement("h4");
        title.classList.add("note-title");
        title.textContent = newTitle;
        container.appendChild(title);

        const content = document.createElement("p");
        content.classList.add("note-content");
        content.textContent = newContent;
        container.appendChild(content);

        // Delete-Button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteNote(container);
        };
        container.appendChild(deleteButton);

        const allnotes = document.getElementById("allnotes");
        allnotes.appendChild(container);

    }
}

function deleteNote(noteElement) {
    const index = Array.from(document.querySelectorAll('.note-container')).indexOf(noteElement);
    if (index > -1) {
        notes.splice(index - 1, 1); // Da die Eingabe auch als Note gezählt wird, "-1"
        saveToStorage();
        noteElement.remove(); // Entfernt das HTML-Element
    }
}

function initNotes() {
    notes = loadFromStorage();
    for (let note of notes) {
        buildNote(note);
    }
}

function saveToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadFromStorage() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}


