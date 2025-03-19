const addBtn = document.querySelector("#add");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".incomplete");
const editIcon = document.querySelector(".edit-icon"); 
const ul = document.querySelector(".todo-list");
const options = document.querySelector(".actions");
const tasks= document.querySelector(".tasks");
const taskEdit = document.querySelector("#task-edit");
const deleteIcon = document.querySelector(".delete-icon");
const taskDelete = document.querySelector("#task-delete");
const incompleteIcon = document.querySelector("#task-incomplete");
const completedIcon = document.querySelector("#task-completed");

function addTask() {
    addBtn.addEventListener("click", () => {
        if(taskInput.value==="") {
            alert("Please enter a task");
            return;
        } else {
        const task = taskInput.value;
        const li = document.createElement("li");
        
        li.innerHTML = `<span id= "task-edit">${task}</span>`
        
        li.appendChild(options.cloneNode(true));
        ul.appendChild(li);
       
        taskInput.value = "";    
    }});
}


addTask();
