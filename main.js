const userInput = document.querySelector("input[name='todo']");
const todoList = document.querySelector(".todo-list");
const submit = document.querySelector(".submit");
let userTask;
let count = 0;
let previouscount;
let detailsToBeUploaded = [];

function displayTask() {
  if (userTask && previouscount != count) {
    console.log(count);
    previouscount = count;
    const html = `<div class='task'> ${userTask}  <input type='checkbox' data-id=${count}> <button class='remove' data-id='${count}'>Remove</button><br><br> </div>`;
    todoList.innerHTML += html;
    const taskDetails = {
      id: count,
      task: userInput.value,
      checked: false
    };
    userInput.value = "";
    detailsToBeUploaded.push(taskDetails);
    console.log(detailsToBeUploaded);
    addListener();
    onTaskChange();
    storeInLocalStorage(detailsToBeUploaded);
  }
}

function addListener() {
  document
    .querySelectorAll(".remove")
    .forEach(item => item.addEventListener("click", removeTodo));
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach(item => item.addEventListener("change", checkToggle));
}

function onTaskChange() {
  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("change", () => {
      item.defaultValue = item.value; // When user updates the task
      detailsToBeUploaded.forEach(object =>
        object.id == item.dataset.id ? (object.task = item.value) : null
      );
      storeInLocalStorage(detailsToBeUploaded);
    });
  });
}

function displayOnReload() {
  detailsToBeUploaded.forEach(item => {
    let html = `<div class='task'> <input type='text' class='item' value='${
      item.task
    }' data-id=${item.id}>  <input type='checkbox' data-id=${item.id} ${
      item.checked ? "checked" : null
    }> <button class='remove' data-id='${
      item.id
    }'>Remove</button><br><br> </div>`;
    todoList.innerHTML += html;
    addListener();
  });
  onTaskChange();
}

function storeInLocalStorage(items) {
  localStorage.setItem("taskdetails", JSON.stringify(items));
  console.log("stored");
}

function restoreFromLocalStorage() {
  item = JSON.parse(localStorage.getItem("taskdetails"));

  if (item) {
    detailsToBeUploaded = JSON.parse(localStorage.getItem("taskdetails"));
    count = detailsToBeUploaded.length + 10;
    detailsToBeUploaded.sort((a, b) => {
      return a.checked - b.checked;
    });
    console.log(detailsToBeUploaded);
    displayOnReload(detailsToBeUploaded);
    console.log(count);
  }
}

function removeTodo(event) {
  event.target.parentElement.remove();
  newTasksToBeUploaded = detailsToBeUploaded.filter(
    item => item.id != event.target.dataset.id
  );
  detailsToBeUploaded = newTasksToBeUploaded;
  storeInLocalStorage(detailsToBeUploaded);
}

function checkToggle(event) {
  console.log(event.target);
  event.target.checked
    ? (event.target.defaultChecked = true)
    : (event.target.defaultChecked = false);
  detailsToBeUploaded.forEach(object =>
    object.id == event.target.dataset.id
      ? (object.checked = event.target.defaultChecked)
      : null
  );
  storeInLocalStorage(detailsToBeUploaded);
}

userInput.addEventListener("blur", () => {
  userTask = `<input type='text' class='item' value="${
    userInput.value
  }" data-id=${++count}>`;
});
submit.addEventListener("click", displayTask);

restoreFromLocalStorage();
