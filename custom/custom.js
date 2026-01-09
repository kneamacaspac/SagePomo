const customButton = document.getElementById("customButton");
const pomoContainerCustom = document.getElementById("pomodoroElements");
const customNotesPage = document.getElementById("notesPage");
const custombackToPomo = document.getElementById("pomodoroButton");
const customtodo = document.querySelector(".todoContainer");
const customaboutPage = document.getElementById("aboutContainer");
const customPage = document.getElementById("customContainer");

customButton.addEventListener("click", () => {
    pomoContainerCustom.style.display = "none";
    customNotesPage.style.display = "none";
    console.log("clicked");
    todo.style.display = "none";
    aboutPage.style.display = "none";
    customPage.style.display = "flex";
});



