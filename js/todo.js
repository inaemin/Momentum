const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");


function deleteToDo() {
  
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  li.appendChild(btn);
  btn.innerText = "❌"
  li.appendChild(span);
  span.innerText = newToDo;
  toDoList.appendChild(li);

  btn.addEventListener("click", deleteToDo);
}

function submitToDo(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  paintToDo(newToDo);
}

toDoForm.addEventListener("submit", submitToDo);
