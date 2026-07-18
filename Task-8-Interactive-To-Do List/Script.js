let taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value==""){
        alert("Please enter a task");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(input.value);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    input.value="";

    loadTasks();

}

function loadTasks(){

    taskList.innerHTML="";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function(task,index){

        let li=document.createElement("li");

        li.innerHTML=`
            <span onclick="completeTask(this)">${task}</span>

            <span class="actions">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </span>
        `;

        taskList.appendChild(li);

    });

}

function deleteTask(index){

    let tasks=JSON.parse(localStorage.getItem("tasks"));

    tasks.splice(index,1);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    loadTasks();

}

function editTask(index){

    let tasks=JSON.parse(localStorage.getItem("tasks"));

    let newTask=prompt("Edit Task",tasks[index]);

    if(newTask!=null && newTask!=""){

        tasks[index]=newTask;

        localStorage.setItem("tasks",JSON.stringify(tasks));

        loadTasks();

    }

}

function completeTask(element){

    element.classList.toggle("completed");

}