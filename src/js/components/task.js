import { DataTaskManager } from '../data/tasks.js';
import '../../css/task.css';


function createTask() {

    const newTaskId = DataTaskManager.addTask('', '');
    
    const taskFrame = document.createElement('li');
    taskFrame.className = 'task-frame';
    taskFrame.setAttribute('task-id', newTaskId);  

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

    const tasksContainer = document.querySelector('.tasks-container');

    tasksContainer.appendChild(taskFrame);

}

export function setupAddTaskButton() {

    const button = document.querySelector('.new-task-button');

    button.addEventListener('click', () => {
        createTask();
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

        const taskFrame = document.createElement('li');
        taskFrame.className = 'task-frame';
        taskFrame.setAttribute('task-id', task.id);  

        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.setAttribute('id', task.id);

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

        taskElement.appendChild(taskTitle);
        taskElement.appendChild(taskDescription);
        taskFrame.appendChild(taskElement);

        let tasksContainer;

        if (task.status === 'todo') {
            tasksContainer = toDoContainer;
        } else if (task.status === 'inProgress') {
            tasksContainer = inProgressContainer;
        } else { tasksContainer = doneContainer; } 
      

        tasksContainer.appendChild(taskFrame);

    }
    
}





export function setupTasksDragAndDrop() {

    let activeTask = null;
    let startX = 0;
    let startY = 0;

    const onMouseMove = (event, activeTask, startX, startY) => {
        if (activeTask) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            //console.log(event.clientY, startY, dy);

            activeTask.style.left = `${dx}px`;
            activeTask.style.top = `${dy}px`;
        }
    };

    const onMouseUp = (event, activeTask) => {
        if(activeTask) {
            activeTask.classList.remove('dragging');
            activeTask.style.position = 'static';

            activeTask = null;

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

    };

    const tasks = document.querySelectorAll('.task');

    tasks.forEach((task) => {
        
        task.addEventListener('mousedown', (event) => {

            task.classList.add('dragging');
            task.style.position = 'relative';
            task.style.zIndex = '1000';

            activeTask = task;
            startX = event.clientX;
            startY = event.clientY;

            const onMouseMoveReference = (event) => onMouseMove(event, activeTask, startX, startY);
            const onMouseUpReference = (event) => onMouseUp(event, activeTask);

            document.addEventListener('mousemove', onMouseMoveReference);
            document.addEventListener('mouseup', onMouseUpReference);

        });

    });

    

}
