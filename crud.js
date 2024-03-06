let addNoteEl = document.getElementById("addNote");
let userInputEl = document.getElementById("userInput");
let notesNamedivEL = document.getElementById("notesNamediv");
let secondPartContainer = document.getElementById("secondPart");
let userNoteEl = document.getElementById("userNote");
let userFormPartEl = document.getElementById("userFormPart");
let displayedHeaderEl = document.getElementById("displayedHeader");
let displayedNotesEl = document.getElementById("displayedNotes");
let saveBtnEl = document.getElementById("saveBtn");
let closeBtnEl = document.getElementById("closeBtn");
let displayCardContainer = document.getElementById("displayCard");
let activeElementId;
let finalDivId;
let idList = [];
let finalDiv;

function savingIdList() {
  localStorage.setItem("ids", JSON.stringify(idList));
}

function getnotesListFromLocalStorage() {
  let stringifiednotesList = localStorage.getItem("notesList");
  let parsednotesList = JSON.parse(stringifiednotesList);
  if (parsednotesList === null) {
    return [];
  } else {
    return parsednotesList;
  }
}

let notesList = getnotesListFromLocalStorage();
console.log(notesList);
for (let note of notesList) {
  displayResults(note);
}

function savenotesList() {
  localStorage.setItem("notesList", JSON.stringify(notesList));
}

function createAndAppend1() {
  let userInputValue = userInputEl.value;
  var a = 0;
  if (userInputValue === "") {
    alert("should not be empty");
  } else if (idList.length > 0) {
    let b = [];
    parsedIdsList = localStorage.getItem("ids");
    b = JSON.parse(parsedIdsList);
    console.log(b, "goose");
    b.sort();
    let len = b.length;
    let vallen = b[len - 1];
    a = vallen + 1;
    idList.push(a);
  } else {
    a = 1;
    idList.push(a);
  }
  let newNote = {
    note: userInputValue,
    id: a,
  };
  notesList.push(newNote);
  displayStyle(newNote);
  userInputEl.value = "";
  savenotesList();
  savingIdList();
}

function deleteFromLocal(headerContainerId) {
  let deleteNoteIndex = notesList.findIndex(function (eachNote) {
    let eachNoteId = "note" + eachNote.notesCount;
    if (eachNoteId === headerContainerId) {
      return true;
    } else {
      return false;
    }
  });
  notesList.splice(deleteNoteIndex, 1);
  console.log(notesList.length);
  if (notesList.length === 0) {
    idList = [];
    localStorage.clear("ids");
    console.log("h");
  }
  savenotesList();
}

function displayStyle(newNote) {
  let headerContainer = document.createElement("div");
  headerContainer.classList.add("selected-d", "d-flex", "flex-row");
  let headerContainerId = "note" + newNote.id;

  headerContainer.id = headerContainerId;
  notesNamedivEL.appendChild(headerContainer);

  let noteHeader = document.createElement("h1");
  noteHeader.classList.add("new-note-header-js");
  noteHeader.textContent = newNote.note;
  headerContainer.appendChild(noteHeader);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  headerContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIconContainer.appendChild(deleteIcon);

  deleteIconContainer.addEventListener("click", function deletecontainer() {
    deleteFromLocal(headerContainerId);
    notesNamedivEL.removeChild(headerContainer);
  });

  headerContainer.addEventListener("click", function () {
    let SecPageHeader = document.createElement("h1");
    let headerDisplayed = newNote.note;
    SecPageHeader.textContent = headerDisplayed;
    SecPageHeader.classList.add("notebooks-css");
    secondPartContainer.innerHTML = "";
    secondPartContainer.appendChild(SecPageHeader);

    document.querySelectorAll(".selected-d").forEach((rambo) => {
      rambo.classList.remove("active");
    });
    headerContainer.classList.add("active");
    activeElementId = headerContainer.id;

    console.log(activeElementId);
  });
}

function newNoteOpen() {
  console.log("newNoteOpen called");
  userFormPartEl.classList.remove("user-form");
}

function gettodoListFromLocalStorage() {
  let stringifiedtodoList = localStorage.getItem("todoList");
  let parsedtodoList = JSON.parse(stringifiedtodoList);
  if (parsedtodoList === null) {
    return [];
  } else {
    return parsedtodoList;
  }
}

let todoList = gettodoListFromLocalStorage();
console.log(todoList);
function displayStoredTodos() {
  for (let newTodo of todoList) {
    displayResults(newTodo);
  }
}

displayStoredTodos();

function savetodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function createAndAppend2() {
  let displayedHeaderValue = displayedHeaderEl.value;
  let displayedNotesValue = displayedNotesEl.value;

  if (displayedHeaderValue === "") {
    alert("enter the notes");
  } else if (displayedNotesValue === "") {
    alert("enter the notes");
  } else {
    let newTodo = {
      head: displayedHeaderValue,
      note: displayedNotesValue,
      todosCount: todoList.length + 1,
    };
    todoList.push(newTodo);
    displayResults(newTodo);
    displayedHeaderEl.value = "";
    displayedNotesEl.value = "";
    savetodoList();
    userFormPartEl.classList.add("user-form");
  }
}

function deleteFromLocalDivCard(finalDivId) {
  let deleteDivIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.todosCount;
    if (eachTodoId === finalDivId) {
      return true;
    } else {
      return false;
    }
  });
  todoList.splice(deleteDivIndex, 1);
  savetodoList();
}

function displayResults(newTodo) {
  finalDiv = document.createElement("div");
  finalDiv.classList.add("display-card", "col-lg-3");
  finalDivId = "todo" + newTodo.todosCount;

  finalDiv.id = finalDivId;

  let finalHeader = document.createElement("h1");
  finalHeader.classList.add("display-card-header");
  finalHeader.textContent = newTodo.head;
  finalDiv.appendChild(finalHeader);

  let finalNote = document.createElement("p");
  finalNote.classList.add("display-card-para");
  finalNote.textContent = newTodo.note;
  finalDiv.appendChild(finalNote);
  displayCardContainer.appendChild(finalDiv);

  let deleteIconContainer2 = document.createElement("div");
  deleteIconContainer2.classList.add(
    "delete-icon-container",
    "todo-delete",
    "mb-2"
  );
  finalDiv.appendChild(deleteIconContainer2);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIconContainer2.appendChild(deleteIcon);

  deleteIconContainer2.addEventListener("click", function deletingDiv() {
    deleteFromLocalDivCard(finalDivId);
    displayCardContainer.removeChild(finalDiv);
    savetodoList();
  });
}

userNoteEl.addEventListener("click", newNoteOpen);
saveBtnEl.addEventListener("click", function () {
  if (!activeElementId) {
    alert("select to which notes, you want to save it");
  } else {
    createAndAppend2();
  }
});
closeBtnEl.addEventListener("click", function () {
  userFormPartEl.classList.add("user-form");
});

addNoteEl.addEventListener("click", createAndAppend1);
