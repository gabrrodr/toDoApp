"use strict";

//result = prompt(title, [default]);
//confirm(question);
//alert(message);

document.getElementById('task').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

window.onload = function() {
    loadTasks();
}

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (tasks) {
        tasks.forEach(function(taskObj) {
            document.getElementById('task').value = taskObj.task;
            addTask();

            const lastTask = document.querySelector('#taskList li:last-child');
            const checkbox = lastTask.querySelector('input');

            if (taskObj.isChecked) {
                checkbox.checked = true;
                lastTask.querySelector('label').style.textDecoration = 'line-through';
            }
        });
    }
    saveTasks();
}

function deleteButton(ul, li) {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        ul.removeChild(li);
        saveTasks();
    }
    return deleteButton;
}

function editButton(label) {
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = function() {
        let newText = prompt('what?', label.textContent);
        if (newText && newText !== ' ') {
            label.textContent = newText;
            saveTasks();
        }
    };
    return editButton;
}



function addTask() {
    const task = document.getElementById('task').value.trim();

    if (task && task !== ' ') {
        let ul = document.getElementById('taskList');
        let li = document.createElement('li');
        
        let label = document.createElement('label');
        label.textContent = task;

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function() {
            label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            saveTasks();
        }

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(editButton(label));
        li.appendChild(deleteButton(ul, li));
        ul.appendChild(li);

        saveTasks();
        document.getElementById('task').value = '';
        
    }
}

function saveTasks() {
    let tasks = [];
    let taskListItems = document.querySelectorAll('#taskList li');

    taskListItems.forEach(function(item) {
        let taskData = {
            task: item.querySelector('label').textContent,
            isChecked: item.querySelector('input').checked,
        };
        tasks.push(taskData);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
   
}
/* 
    IN JS:

    -find elemnets on page --
    -listen for button clicks --
    -create new task in the list --
    -add a delete button next to each task --
    -allow users to delete tasks when they click it --
    
    -add checkboxes to mark tasks as completed --
    -use local storage so tasks dont disappear when the page refreshes --

    IN TS:

    -install Node.js (verify installation: node -v)
    -create folder, initialize project (npm init -y)
    (this creates package.json, manages project dependencies)
    -npm install -g typescript && tsc -v
    -Install lite server for running the app (npm install lite-server (--save-dev))
    -Configure typescript:
        -tsc --init (run. creates tsconfig.json)
        -make sure these are set
        {
            "target": "ES6", (modern js is generated)
            "outDir": "./dist", (compiled js goes here)
            "rootDir": "./src", (write ts here)
            "strict": true
        }
    -inside todoapp index, css and app.ts in src
    - html same as js
    -css same as js
    -src/app.ts
        - find elements, listen for buttons,
        -create li fo each task
        -delete button
        -remove tasks
    -Compile ts (tsc -generates a dist/app.js)
    -update index to use compiled jss
    -run app (npx lite-server) - open localhost:3000 in your browser
    -checkmarks
    -local storage
    -Improve UI using css frameworks like TailwindCSS

    */