const addBtn = document.querySelector("#add");
const taskInput = document.querySelector("#task-input");
const completedList = document.querySelector(".todo-list.completed");
const editIcon = document.querySelector(".edit-icon");
const ul = document.querySelector(".todo-list");
const optionsInc = document.querySelector(".actions");
const tasks = document.querySelector(".tasks");
// const taskEdit = document.querySelector("#task-edit");
const deleteIcon = document.querySelector(".delete-icon");
const taskDelete = document.querySelector("#task-delete");
const incompleteIcon = document.querySelector(".checkbox");
const completedIcon = document.querySelector("#task-completed");

function addTask() {
  addBtn.addEventListener("click", () => {
    if (taskInput.value === "") {
      alert("Please enter a task");
      return;
    } else {
      const task = taskInput.value;
      const li = document.createElement("li");

      li.innerHTML = `<span contenteditable="false">${task}</span>
        <div class="actions">
              <img src="assets/border_color_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg" alt="edit" class="edit-icon hidden-edit" />
              <img src="assets/delete_24dp_C89F7E_FILL0_wght400_GRAD0_opsz24.svg" alt="delete" class="delete-icon"/>
              <div class="checkbox"></div>
            </div>`;

      ul.appendChild(li);

      taskInput.value = "";

      editTask();
      deleteTask();
      taskCompleted();
      undoCompletedTask();
    }
  });
}

addTask();

function editTask() {
  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-icon")) {
      const li = e.target.closest("li"); // target the icon's closest li. Good to use when you dont know how many wrappers you have as parents
      const liContent = li.querySelector("span"); // Then li's span
      liContent.setAttribute("contenteditable", "true");
      liContent.focus();
      console.log(e.target.innerHTML);
    }
  });
}

function deleteTask() {
  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
      const li = e.target.closest("li");
      li.remove();
    }
  });
}

function taskCompleted() {
  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkbox")) {
      const li = e.target.closest("li");

      completedList.appendChild(li);

      const editHidden = document.querySelector(".edit-icon.hidden-edit");
      editHidden.style.display = "none";

      deleteTask();
    }
  });
}

function undoCompletedTask() {}

// want to replace the edit icon with save and then save to edit
