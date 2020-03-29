const userInput = document.querySelector("input[name='todo']");
const todoList = document.querySelector(".todo-list");
const submit = document.querySelector(".submit");
let userTask;
let count = 0;

function displayTask() {
  if (userTask) {
    const html = `<div class='task'> ${userTask}  <input type='checkbox' data-id=${count++}> <button class='remove' >Remove</button><br><br> </div>`;
    todoList.innerHTML += html;
    document
      .querySelectorAll(".remove")
      .forEach(item => item.addEventListener("click", removeTodo));
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach(item => item.addEventListener("change", checkToggle));
    document.querySelectorAll(".item").forEach(item => {
      item.addEventListener("change", () => {
        item.defaultValue = item.value;
      });
    });
  }
}

function removeTodo(event) {
  event.target.parentElement.remove();
}

function checkToggle(event) {
  console.log(event.target.checked);
}

userInput.addEventListener("blur", () => {
  userTask = `<input type='text' class='item' value="${userInput.value}">`;
});
submit.addEventListener("click", displayTask);
