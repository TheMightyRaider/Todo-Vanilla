const userInput = document.querySelector("input[name='todo']");
const todoList = document.querySelector(".todo-list");
const submit = document.querySelector(".submit");
const search = document.querySelector(".search");
const searchItem = document.querySelector("input[name='search']");
let userTask;
let count = 0;
let previouscount;
let htmlToBeAppended;
let detailsToBeUploaded = [];

function displayTask() {
  if (userTask && previouscount != count) {
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
  todoList.innerHTML += generateHtml(detailsToBeUploaded);
  addListener();
  onTaskChange();
}

function generateHtml(taskArray) {
  htmlToBeAppended = "";
  taskArray.forEach(item => {
    let html = `<div class='task'> <input type='text' class='item' value='${
      item.task
    }' data-id=${item.id}>  <input type='checkbox' data-id=${item.id} ${
      item.checked ? "checked" : null
    }> <button class='remove' data-id='${
      item.id
    }'>Remove</button><br><br> </div>`;
    htmlToBeAppended += html;
  });
  return htmlToBeAppended;
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
    displayOnReload(detailsToBeUploaded);
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

function searchTask() {
  const taskToBeSearched = document.querySelector('input[name="search"]').value;
  const searchedItem = detailsToBeUploaded.filter(
    obj => obj.task.toUpperCase() == taskToBeSearched.toUpperCase()
  );
  if (searchedItem.length > 0) {
    todoList.style.display = "none";
    document.querySelector(".taskSearched").innerHTML = generateHtml(
      searchedItem
    );
  } else {
    todoList.style.display = "block";
    document.querySelector(".taskSearched").innerHTML = "";
  }
}

function dynamicSearch(event) {
  if ((event.which <= 90 && event.which >= 48) || event.which == 8) {
    const displayResult = document.querySelector(".taskSearched");
    const taskToBeSearched = document
      .querySelector('input[name="search"]')
      .value.toUpperCase();
    if (taskToBeSearched != "") {
      const matchingItem = detailsToBeUploaded
        .map(item => {
          if (item.task.toUpperCase().indexOf(taskToBeSearched) > -1) {
            return item;
          }
        })
        .filter(item => item != undefined);
      if (matchingItem.length > 0) {
        todoList.style.display = "none";
        displayResult.innerHTML = generateHtml(matchingItem);
        addListener();
        onTaskChange();
      }
    } else {
      todoList.style.display = "block";
      displayResult.innerHTML = "Your task doesn't exist";
    }
  }
}

function handleClick(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    userTask = `<input type='text' class='item' value="${
      userInput.value
    }" data-id=${++count}>`;
    displayTask();
  }
}

submit.addEventListener("click", displayTask);
userInput.addEventListener("keyup", handleClick);
searchItem.addEventListener("keyup", dynamicSearch);

restoreFromLocalStorage();
