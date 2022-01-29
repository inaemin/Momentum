const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
let toDos = [];




function saveToDo() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function completeToDo(event) {
    const li = event.currentTarget.parentElement;
    li.querySelector(".fa-check").style.color = "rgba(255,255,255,0.3)";
    li.style.color = "rgba(255,255,255,0.3)";
  }

function deleteToDo(event) {
  const li = event.currentTarget.parentElement;
  li.remove();
  toDos = toDos.filter((toDos) => toDos.id !== parseInt(li.id));
  saveToDo();
}

function paintToDo(toDos) {
  const li = document.createElement("li");
  li.id = toDos.id;
  const span = document.createElement("span");
  const btn_check = document.createElement("button");
  const btn_trash = document.createElement("button");
  li.appendChild(btn_check);
  btn_check.innerHTML = "<i class=\"fas fa-check\" style=\"color: #00d269;\"></i>";
  li.appendChild(btn_trash);
  btn_trash.innerHTML = "<i class=\"far fa-trash-alt\" style=\"color: #fd7e15;\"></i>";
  li.appendChild(span);
  span.innerText = toDos.text;
  toDoList.appendChild(li);

  btn_trash.addEventListener("click", deleteToDo);
  btn_check.addEventListener("click", completeToDo);
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