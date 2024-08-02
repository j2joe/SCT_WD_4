document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task-button');
    const addListButton = document.getElementById('add-list-button');
    const taskTitleInput = document.getElementById('task-title');
    const taskDateTimeInput = document.getElementById('task-datetime');
    const listTitleInput = document.getElementById('list-title');
    const listsContainer = document.getElementById('lists');
    const tasksContainer = document.getElementById('tasks');

    let lists = [];
    let tasks = [];

    function renderLists() {
        listsContainer.innerHTML = '';
        lists.forEach((list, index) => {
            const listElement = document.createElement('li');
            listElement.textContent = list.title;
            listElement.dataset.index = index;
            listElement.addEventListener('click', function() {
                selectList(index);
            });
            listsContainer.appendChild(listElement);
        });
    }

    function renderTasks() {
        tasksContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.textContent = `${task.title} (${task.dateTime})`;
            if (task.completed) {
                taskElement.classList.add('completed');
            }

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.addEventListener('click', function() {
                toggleCompleteTask(index);
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function() {
                editTask(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteTask(index);
            });

            taskElement.appendChild(completeButton);
            taskElement.appendChild(editButton);
            taskElement.appendChild(deleteButton);
            tasksContainer.appendChild(taskElement);
        });
    }

    function addTask() {
        const title = taskTitleInput.value;
        const dateTime = taskDateTimeInput.value;
        if (title && dateTime) {
            tasks.push({ title, dateTime, completed: false });
            taskTitleInput.value = '';
            taskDateTimeInput.value = '';
            renderTasks();
        } else {
            alert('Please enter both a task title and a date/time.');
        }
    }

    function addList() {
        const title = listTitleInput.value;
        if (title) {
            lists.push({ title, tasks: [] });
            listTitleInput.value = '';
            renderLists();
        } else {
            alert('Please enter a list title.');
        }
    }

    function selectList(index) {
        tasks = lists[index].tasks;
        renderTasks();
    }

    function toggleCompleteTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function editTask(index) {
        const newTitle = prompt('Enter new task title:', tasks[index].title);
        const newDateTime = prompt('Enter new task date/time:', tasks[index].dateTime);
        if (newTitle && newDateTime) {
            tasks[index].title = newTitle;
            tasks[index].dateTime = newDateTime;
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);
    addListButton.addEventListener('click', addList);

    renderLists();
});
