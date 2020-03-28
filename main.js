const userInput = document.querySelector("input[name='todo']").value;
const todoList = document.querySelector(".todo-list");
const submit = document.querySelector(".submit");
let count = 0;

function displayTask() {
  const html = `${userInput}  <input type='checkbox' dataset-id=${count++}><br><br>`;
  todoList.innerHTML += html;
  //   const checkBox = document.createElement("input");
  //   checkBox.type = "checkBox";
  //   checkBox.dataset.id = ++count;
  //   todoList.insertAdjacentText("beforeend", userInput);
  //   todoList.appendChild(checkBox);
}

submit.addEventListener("click", displayTask);
