import { DataTaskManager } from '../data/tasks.js';
import '../../css/task.css';


function createTask() {

    const newTaskId = DataTaskManager.addTask('', '', );
    
    const taskFrame = document.createElement('li');
    taskFrame.className = 'task-frame';

    const task = document.createElement('div');
    task.className = 'task';
    task.setAttribute('id', newTaskId);

    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';
    taskTitle.setAttribute('contenteditable', 'true');
    taskTitle.setAttribute('data-placeholder', 'Título');
    taskTitle.textContent = '';

    const taskDescription = document.createElement('div');
    taskDescription.className = 'task-description';
    taskDescription.setAttribute('contenteditable', 'true');
    taskDescription.setAttribute('data-placeholder', 'Descrição');
    taskDescription.textContent = '';

    task.appendChild(taskTitle);
    task.appendChild(taskDescription);
    taskFrame.appendChild(task);

    const tasksContainer = document.querySelector('.tasks-header-container').querySelector('.new-task-button');

    console.log(tasksContainer);
    tasksContainer.appendChild(taskFrame);

}

export function setupAddTaskButton() {

    const button = document.querySelectorAll('.new-task-button');

    button.addEventListener('click', () => {
        createTask();
    });

}

export function setupMemoyUpdater() {

    document.addEventListener('input', (event) => {
        const taskFrame = event.target.closest('.task-frame');

        const taskTitle = taskFrame.querySelector('.task-title');
        const taskDescription = taskFrame.querySelector('.task-description');
        const taskId = taskFrame.querySelector('.task').getAttribute('id');
        
        const title = taskTitle.textContent;
        const description = taskDescription.textContent;

        DataTaskManager.editTask(taskId, title, description);

    });

}

export function renderTasks() {

    const categoryContainers = document.querySelectorAll('.tasks-category-container');

    const toDoContainer = categoryContainers[0].querySelector('.tasks-container');
    const inProgressContainer = categoryContainers[1].querySelector('.tasks-container');
    const doneContainer = categoryContainers[2].querySelector('.tasks-container');

    const tasks = DataTaskManager.getTasks();

    for (const task of tasks.values())  {

        const taskFrame = document.createElement('li');
        taskFrame.className = 'task-frame';

        const task = document.createElement('div');
        task.className = 'task';
        task.setAttribute('id', task.id);

        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.setAttribute('contenteditable', 'true');
        taskTitle.setAttribute('data-placeholder', 'Título');
        taskTitle.textContent = task.title;

        const taskDescription = document.createElement('div');
        taskDescription.className = 'task-description';
        taskDescription.setAttribute('contenteditable', 'true');
        taskDescription.setAttribute('data-placeholder', 'Descrição');
        taskDescription.textContent = task.description;

        task.appendChild(taskTitle);
        task.appendChild(taskDescription);
        taskFrame.appendChild(task);

        let tasksContainer;

        if (task.status === 'todo') {
            tasksContainer = toDoContainer;
        } else if (task.status === 'inProgress') {
            tasksContainer = inProgressContainer;
        } else { tasksContainer = doneContainer; }  

        tasksContainer.appendChild(taskFrame);

    }
    
}
