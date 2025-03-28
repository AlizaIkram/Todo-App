const addBtn = document.querySelector("#add");
const taskInput = document.querySelector("#task-input");
const completedList = document.querySelector(".todo-list.completed");
const incompleteList = document.querySelector(".todo-list.incomplete");
const ul = document.querySelector(".todo-list");

let todoList = [];


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
})
function addTask() {
  
    if (taskInput.value.trim() === "") {
      showCustomAlert("Please enter a task");
      return;
    } 

      const task = taskInput.value;
      const li = document.createElement("li");

      li.innerHTML = `<span contenteditable="false">${task}</span>
        <div class="actions">
              <img src="assets/border_color_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg" alt="edit" class="edit-icon hidden-edit" />
              <img src="assets/delete_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg" alt="delete" class="delete-icon"/>
              <div class="checkbox"></div>
            </div>`;
      
            todoList.push({text: `${task}`, completed: false});
            
      ul.appendChild(li);

      taskInput.value = "";
      saveTodoList();
}




function editTask() {
  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-icon")) {
      const li = e.target.closest("li"); // target the icon's closest li. Good to use when you dont know how many wrappers you have as parents
      const liContent = li.querySelector("span"); // Then li's span

      if (e.target.alt === "edit") {
        liContent.setAttribute("contenteditable", "true");
        liContent.focus();

        // Move cursor to the end of the content
        const range = document.createRange();
        range.selectNodeContents(liContent);
        range.collapse(false); // false = end of the node
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Change the icon
        e.target.src = "assets/save_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg";
        e.target.alt = "save";
      } else if (e.target.alt === "save") {
        if (liContent.textContent === "") {
          li.remove();
        } else {
          liContent.setAttribute("contenteditable", "false");
          e.target.src =
            "assets/border_color_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg";
          e.target.alt = "edit";
          saveTodoList();
        }
      }
    }
  });
}


function deleteTask() {
  [incompleteList, completedList].forEach((list) => {
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-icon")) {
        const li = e.target.closest("li");
        li.remove();
        
        const index = todoList.indexOf(li);
        todoList.splice(index, 1);
        saveTodoList();
      }
    });
  });
}

function taskCompleted() {
  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkbox")) {
      const li = e.target.closest("li");
      if (li.querySelector("span").getAttribute("contenteditable") === "true") {
        showCustomAlert("Please save the task first");
        return;
      }
      completedList.appendChild(li);
      for (const index of todoList.keys()) {
        if (todoList[index].text === li.querySelector("span").textContent) {
          todoList[index].completed = true;
        }

      }

      saveTodoList();
      console.log(todoList);
      
      const circle = li.querySelector(".checkbox");
      circle.classList.add("checked");
      circle.style.backgroundColor = "#c89f7e";

      const editHidden = li.querySelector(".edit-icon.hidden-edit");
      editHidden.style.display = "none";
    }
  });
}

function undoCompletedTask(task) {
  completedList.addEventListener("click", (e) => {
    if (e.target.classList.contains("checked")) {
      const li = e.target.closest("li");
      incompleteList.appendChild(li);

      for (const index of todoList.keys()) {
        if (todoList[index].text === li.querySelector("span").textContent) {
          todoList[index].completed = false;
        }

      }
      saveTodoList();

      const editHidden = li.querySelector(".edit-icon.hidden-edit");
      editHidden.style.display = "flex";

      const circle = li.querySelector(".checkbox");
      circle.style.backgroundColor = "transparent";
    }
  });
}

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoList() {
  const storedTodoList = localStorage.getItem("todoList");
  if(storedTodoList) {
    todoList = JSON.parse(storedTodoList);
    if(todoList.length > 0) {
      todoList.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `<span contenteditable="false">${task.text}</span>
        <div class="actions">
              <img src="assets/border_color_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg" alt="edit" class="edit-icon hidden-edit" />
              <img src="assets/delete_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg" alt="delete" class="delete-icon"/>
              <div class="checkbox"></div>
            </div>`;
            
        if(task.completed === false) { 
          incompleteList.appendChild(li);
        } else {
          
          completedList.appendChild(li);
          
          const circle = li.querySelector(".checkbox");
          circle.classList.add("checked");
          circle.style.backgroundColor = "#c89f7e";
        }
      });
    }
  }
}


            const alertContainer = document.getElementById('custom-alert');
            const alertMessage = document.getElementById('alert-message');
            const closeButton = document.getElementById('close-button');

            function showCustomAlert(message) {
                alertMessage.textContent = message;
                alertContainer.style.display = 'block';
            }

            function hideCustomAlert() {
                alertContainer.style.display = 'none';
            }

            closeButton.addEventListener('click', hideCustomAlert);


loadTodoList();


editTask();
deleteTask();
taskCompleted();
undoCompletedTask();
