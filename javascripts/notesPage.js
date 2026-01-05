/*I also added the about page in this file*/

const notesButton = document.getElementById("notesButton");
const pomoContainer = document.getElementById("pomodoroElements");
const notesPage = document.getElementById("notesPage");
const backToPomo = document.getElementById("pomodoroButton");
const todo = document.querySelector(".todoContainer");
const aboutButton = document.getElementById("aboutButton");
const aboutPage = document.getElementById("aboutContainer");

notesButton.addEventListener("click", () => {
  pomoContainer.style.display = "none";
  notesPage.style.display = "block";
  console.log("clicked");
  todo.style.display = "none";
  aboutPage.style.display = "none";
});

backToPomo.addEventListener("click", () => {
  pomoContainer.style.display = "flex";
  notesPage.style.display = "none";
  aboutPage.style.display = "none";
  todo.style.display = "none";
});

const notesArea = document.getElementById("notesArea");
const saveNotesBtn = document.getElementById("saveNotes");

// Load notes on page load
notesArea.value = localStorage.getItem("pomoNotes") || "";

// Save notes
saveNotesBtn.addEventListener("click", () => {
  localStorage.setItem("pomoNotes", notesArea.value);
});

//About Page
aboutButton.addEventListener("click", () => {
  pomoContainer.style.display = "none";
  notesPage.style.display = "none";
  todo.style.display = "none";
  aboutPage.style.display = "block";
});
