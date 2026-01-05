/*PAGE ELEMENTS*/
const tasksButton = document.getElementById("tasksButton");
const backToPomodoro = document.getElementById("pomodoroButton");

const pomoElements = document.getElementById("pomodoroElements");
const notesContainer = document.getElementById("notesPage");

const todoPage = document.getElementById("todoPage");
const todoHistoryPage = document.getElementById("todoHistoryPage");

const todoAboutPage = document.getElementById("aboutContainer");

/*TODO ELEMENTS*/
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

const showHistoryBtn = document.getElementById("showHistory");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

/*LOCAL STORAGE KEYS*/
const TODO_KEY = "sagePomoTodos";
const HISTORY_KEY = "sagePomoTodoHistory";

/*************************
 * LOAD SAVED DATA
 *************************/
let todos = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

renderTodos();
renderHistory();

/*PAGE TOGGLE LOGIC*/
tasksButton.addEventListener("click", () => {
  pomoElements.style.display = "none";
  notesContainer.style.display = "none";
  todoAboutPage.style.display = "none";

  todoPage.style.display = "block";
  todoHistoryPage.style.display = "none";
});

/*************************
 * ADD TODO
 *************************/
addTodoBtn.addEventListener("click", addTask);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const task = todoInput.value.trim();
  if (!task) return;

  todos.push(task);
  todoInput.value = "";

  saveTodos();
  renderTodos();
}

/*************************
 * RENDER TODOS
 *************************/
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("todoItem");

    const text = document.createElement("span");
    text.textContent = task;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";
    doneBtn.classList.add("doneBtn");
    doneBtn.addEventListener("click", () => finishTask(index));

    li.appendChild(text);
    li.appendChild(doneBtn);
    todoList.appendChild(li);
  });
}

/*************************
 * FINISH TASK
 *************************/
function finishTask(index) {
  history.push(todos[index]);
  todos.splice(index, 1);

  saveTodos();
  saveHistory();

  renderTodos();
  renderHistory();
}

/*************************
 * HISTORY PAGE
 *************************/
showHistoryBtn.addEventListener("click", () => {
  todoPage.style.display = "none";
  todoHistoryPage.style.display = "flex";
});

backToTodoBtn.addEventListener("click", () => {
  todoHistoryPage.style.display = "none";
  todoPage.style.display = "flex";
});

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  saveHistory();
  renderHistory();
});

/*************************
 * RENDER HISTORY
 *************************/
function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    historyList.appendChild(li);
  });
}

/*************************
 * SAVE FUNCTIONS
 *************************/
function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
