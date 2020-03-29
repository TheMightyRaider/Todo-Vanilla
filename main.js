const userInput = document.querySelector("input[name='todo']");
const todoList = document.querySelector(".todo-list");
const submit = document.querySelector(".submit");
let userTask;
let count = 0;

function displayTask() {
  if (userTask) {
    const html = `<div class='task'> ${userTask}  <input type='checkbox' data-id=${count++}> <button class='remove' data-id=${count++}>Remove</button><br><br> </div>`;
    todoList.innerHTML += html;
    document
      .querySelectorAll(".remove")
      .forEach(item => item.addEventListener("click", removeTodo));
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach(item => item.addEventListener("change", checkToggle));
  }
}

function removeTodo(event) {
  console.log(event.target.parentElement.remove());
}

function checkToggle(event) {
  console.log(event);
  console.log(event.target.checked);
}

userInput.addEventListener("blur", () => {
  console.log(userInput.value);
  userTask = userInput.value;
});
submit.addEventListener("click", displayTask);
