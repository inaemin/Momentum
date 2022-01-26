const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
let toDos = [];


function saveToDo() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDos) => toDos.id !== parseInt(li.id));
  saveToDo();
}

function paintToDo(toDos) {
  const li = document.createElement("li");
  li.id = toDos.id;
  const span = document.createElement("span");
  const btn = document.createElement("button");
  li.appendChild(btn);
  btn.innerText = "❌"
  li.appendChild(span);
  span.innerText = toDos.text;
  toDoList.appendChild(li);

  btn.addEventListener("click", deleteToDo);
}

function submitToDo(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo, id: Date.now()
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDo();
}

toDoForm.addEventListener("submit", submitToDo);

const savedToDo = localStorage.getItem("todos");
if (savedToDo !== null) {
  const parsedToDo = JSON.parse(savedToDo);
  toDos = parsedToDo;
  parsedToDo.forEach(paintToDo);
}