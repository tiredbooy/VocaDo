const $ = document;
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const todoInput = $.getElementById("todoInput");
const todoContainer = $.getElementById("todos");
const addButton = $.getElementById("add-button");
const recognition = new SpeechRecognition();
const micButton = document.getElementById("microphone");
const allTaskBtn = document.getElementById('allTask')
const completedTaskBtn = document.getElementById('completedTask')
const unCompletedTaskBtn = document.getElementById('unCompletedTask')

recognition.lang = "en-US";

recognition.addEventListener("result", (event) => {
  const transcript = event.results[0][0].transcript;
  // showDetectedTxt.innerHTML = transcript;

  todoInput.value = transcript;
});

micButton.addEventListener("click", (e) => {
  micButton.classList.toggle('active');
  e.preventDefault();

  if (micButton.classList.contains("active")) {
    recognition.start();
  } else {
    recognition.stop();
  }
});

function addTodo() {
  let todoInputValue = todoInput.value.trim();
  if (todoInputValue) {
    const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
    let id = Date.now();
  

    // Insert the new todo HTML
    todoContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div  data-id="${id}" class="todo flex flex-row justify-between items-center mx-3 p-2 border-b">
      <li class="todo-item">${todoInputValue}</li>
      <div class="flex items-center gap-3">
        <button class="text-center p-2 transition-colors" onclick="removeTodo(event)">
          <i class="fa-solid fa-trash text-gray-400 hover:text-gray-600 duration-150"></i>
        </button>
        <input type="checkbox" id="${id}" onchange="checkComplete(event)" class="hidden" />
        <label
          for="${id}"
          class="w-5 h-5 rounded border border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-gray-100"
        >
          <i class="fa-solid fa-check text-white hidden checkmark"></i>
        </label>
      </div>
    </div>
  `
    );

    const todoObj = {
      id: id,
      item: todoInputValue,
      isCompleted: false,
    };

    todoArray.push(todoObj);

    localStorage.setItem("todo", JSON.stringify(todoArray));
  }
}

function checkComplete(event) {
  const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
  const checkBox = event.target;
  const todoItem = checkBox.closest(".todo");
  const li = todoItem.querySelector(".todo-item");
  const checkMark = todoItem.querySelector(".checkmark");
  let getLiId = todoItem.getAttribute("data-id");

  let filteredArray = todoArray.findIndex((todo) => todo.id == getLiId);
  console.log(filteredArray);
  

  if (checkBox.checked) {
    li.classList.add("completed");
    checkMark.classList.remove("hidden");
    checkMark.parentElement.classList.add("bg-blue-600", "border-blue-600");
    
    todoArray[filteredArray].isCompleted = true;
    localStorage.setItem('todo',JSON.stringify(todoArray))
  } else {
    li.classList.remove("completed");
    checkMark.classList.add("hidden");
    checkMark.parentElement.classList.remove("bg-blue-600", "border-blue-600");
    todoArray[filteredArray].isCompleted = false;
    localStorage.setItem('todo',JSON.stringify(todoArray))
  }
}

// Remove Function
function removeTodo(event) {
  const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
  const removeBtn = event.target;
  const todoItem = removeBtn.closest(".todo");
  let getLiId = todoItem.getAttribute("data-id");

  let filteredTodoArray = todoArray.filter((todo) => todo.id != getLiId);

  todoContainer.removeChild(todoItem);

  localStorage.setItem("todo", JSON.stringify(filteredTodoArray));
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();

  todoInput.value = "";
});

function loadTodosFromLocalStorage() {
  const todoArray = JSON.parse(localStorage.getItem("todo"));
  
  if (todoArray) {
    todoArray.forEach((todo) => {
      
      // Insert the HTML for each todo item
      todoContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div data-id="${todo.id}" class="todo flex flex-row justify-between items-center mx-3 p-2 border-b">
          <li class="todo-item">${todo.item}</li>
          <div class="flex items-center gap-3">
            <button class="text-center p-2 transition-colors" onclick="removeTodo(event)">
              <i class="fa-solid fa-trash text-gray-400 hover:text-gray-600 duration-150"></i>
            </button>
            <input type="checkbox" id="${todo.id}" onchange="checkComplete(event)" class="hidden" />
            <label
              for="${todo.id}"
              class="w-5 h-5 rounded border border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-gray-100"
            >
              <i class="fa-solid fa-check text-white hidden checkmark "></i>
            </label>
          </div>
        </div>
        `
      );

      // Select the newly inserted elements based on the current `todo.id`
      const todoItem = document.querySelector(`[data-id="${todo.id}"]`);
      const li = todoItem.querySelector(".todo-item");
      const checkBox = todoItem.querySelector(`input[type="checkbox"]`);
      const checkMark = todoItem.querySelector(".checkmark");

      // If `isCompleted` is true, apply the completed styles
      if (todo.isCompleted) {
        li.classList.add("completed");
        checkBox.checked = true;
        checkMark.classList.remove("hidden");
        checkMark.parentElement.classList.add("bg-blue-600", "border-blue-600");
      }
    });
  }
}

loadTodosFromLocalStorage()


function resetButtonStyles() {
  allTaskBtn.classList.replace('bg-indigo-700', 'bg-indigo-500');
  completedTaskBtn.classList.replace('bg-indigo-700', 'bg-indigo-500');
  unCompletedTaskBtn.classList.replace('bg-indigo-700', 'bg-indigo-500');
}

function loadTasksFromButtons(button) {
  const todoArray = JSON.parse(localStorage.getItem("todo"));
  
  if (button === 'uncompleted') {
    let a = todoArray.filter(todo => !todo.isCompleted);
    console.log('a:', a);
    todoContainer.innerHTML = '';
    a.forEach((b) => {
      insertAdjacentHTML(b);
      console.log('b:', b);
    });
  } else if (button === 'completed') {
    todoContainer.innerHTML = '';
    let a = todoArray.filter(todo => todo.isCompleted);
    console.log('a:', a);
    a.forEach((b) => {
      insertAdjacentHTML(b);
      console.log('b:', b);
    });
  } else if (button === 'allTask') {
    todoContainer.innerHTML = '';
    loadTodosFromLocalStorage();
  }
}

// Event listeners for each button
allTaskBtn.addEventListener('click', () => {
  resetButtonStyles();  // Reset styles first
  loadTasksFromButtons('allTask');
  allTaskBtn.classList.replace('bg-indigo-500', 'bg-indigo-700');
});

completedTaskBtn.addEventListener('click', () => {
  resetButtonStyles();  // Reset styles first
  loadTasksFromButtons('completed');
  completedTaskBtn.classList.replace('bg-indigo-500', 'bg-indigo-700');
});

unCompletedTaskBtn.addEventListener('click', () => {
  resetButtonStyles();  // Reset styles first
  loadTasksFromButtons('uncompleted');
  unCompletedTaskBtn.classList.replace('bg-indigo-500', 'bg-indigo-700');
});

function insertAdjacentHTML(input) {
  

  todoContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div data-id="${input.id}" class="todo flex flex-row justify-between items-center mx-3 p-2 border-b">
      <li class="todo-item">${input.item}</li>
      <div class="flex items-center gap-3">
        <button class="text-center p-2 transition-colors" onclick="removeTodo(event)">
          <i class="fa-solid fa-trash text-gray-400 hover:text-gray-600 duration-150"></i>
        </button>
        <input type="checkbox" id="${input.id}" onchange="checkComplete(event)" class="hidden" />
        <label
          for="${input.id}"
          class="w-5 h-5 rounded border border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-gray-100"
        >
          <i class="fa-solid fa-check text-white hidden checkmark "></i>
        </label>
      </div>
    </div>
    `
  );

  const todoItem = document.querySelector(`[data-id="${input.id}"]`);
      const li = todoItem.querySelector(".todo-item");
      const checkBox = todoItem.querySelector(`input[type="checkbox"]`);
      const checkMark = todoItem.querySelector(".checkmark");

      // If `isCompleted` is true, apply the completed styles
      if (input.isCompleted) {
        li.classList.add("completed");
        checkBox.checked = true;
        checkMark.classList.remove("hidden");
        checkMark.parentElement.classList.add("bg-blue-600", "border-blue-600");
      }
}