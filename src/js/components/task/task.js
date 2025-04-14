import { DataTaskManager } from '../../data/tasks.js';
import { setupDragAndDrop } from './drag_and_drop.js';  
import '../../../css/task.css';


function createTaskElement(id, title = '', description = '') {
    
    const taskFrame = document.createElement('li');
    taskFrame.className = 'task-frame';
    taskFrame.setAttribute('task-id', id);

    const task = document.createElement('div');
    task.className = 'task';
    task.setAttribute('id', id);

    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';
    taskTitle.setAttribute('contenteditable', 'true');
    taskTitle.setAttribute('data-placeholder', 'Título');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('div');
    taskDescription.className = 'task-description';
    taskDescription.setAttribute('contenteditable', 'true');
    taskDescription.setAttribute('data-placeholder', 'Descrição');
    taskDescription.textContent = description;

    task.appendChild(taskTitle);
    task.appendChild(taskDescription);
    taskFrame.appendChild(task);

    setupDragAndDrop(task);

    return taskFrame;
}

function addTask(status = 'todo') {

    const newTaskId = DataTaskManager.addTask(status);
    
    const taskFrame = createTaskElement(newTaskId);
    const tasksContainer = document.querySelector('.tasks-container');

    tasksContainer.appendChild(taskFrame);

}

export function setupAddTaskButton() {

    const button = document.querySelector('.new-task-button');

    button.addEventListener('click', () => {
        addTask();
    });

}

export function setupMemoryUpdater() {

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

// Dividir essa função em duas: uma para renderizar as tarefas e outra para adicionar a tarefa	?
export function renderTasks() {

    const categoryContainers = document.querySelectorAll('.tasks-category-container');

    const toDoContainer = categoryContainers[0].querySelector('.tasks-container');
    const inProgressContainer = categoryContainers[1].querySelector('.tasks-container');
    const doneContainer = categoryContainers[2].querySelector('.tasks-container');

    const tasks = DataTaskManager.getTasks();

    for (const task of tasks.values())  {

        const taskFrame = createTaskElement(task.id, task.title, task.description);

        let tasksContainer;

        if (task.status === 'todo') {
            tasksContainer = toDoContainer;
        } else if (task.status === 'inProgress') {
            tasksContainer = inProgressContainer;
        } else { tasksContainer = doneContainer; } 
      
        tasksContainer.appendChild(taskFrame);

    }
    
}

// export function setupTasksDragAndDrop() {

//     let dragState = {
//         activeTask: null,
//         startX: 0,
//         startY: 0,
//     }

//     const onMouseMove = (event) => {
//         if (dragState.activeTask) {

//             const dx = event.clientX - dragState.startX;
//             const dy = event.clientY - dragState.startY;

//             dragState.activeTask.style.left = `${dx}px`;
//             dragState.activeTask.style.top = `${dy}px`;

//             console.log(dragState.activeTask.style.left);
//         }
//     };

//     const onMouseUp = (event) => {
//         if(dragState.activeTask) {
//             dragState.activeTask.classList.toggle('dragging');

//             dragState.activeTask = null;
//             dragState.startX = 0;
//             dragState.startY = 0;

//             document.removeEventListener('mousemove', onMouseMove);
//             document.removeEventListener('mouseup', onMouseUp);
//         }

//     };

//     const tasks = document.querySelectorAll('.task');

//     tasks.forEach((task) => {
        
//         task.addEventListener('mousedown', (event) => {

//             task.classList.add('dragging');

//             dragState.activeTask = task;
//             dragState.startX = event.clientX;
//             dragState.startY = event.clientY;

//             document.addEventListener('mousemove', onMouseMove);
//             document.addEventListener('mouseup', onMouseUp);

//         });

//     });

// }

