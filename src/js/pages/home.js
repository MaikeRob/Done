import { setupAddTaskButton, renderTasks, setupMemoryUpdater } from '../components/task/task.js';
import '../../css/home.css';

const template = document.createElement('template');

template.innerHTML = `
    <main>
        <div id= "to-do" class="tasks-category-container">
            <div class="tasks-header-container">
                <button class="new-task-button">+</button>
                <p class="header-label">To-do</p>
            </div>
            <ul class="tasks-container">
            </ul>
        </div>
        <div id="in-progress" class="tasks-category-container">
            <div class="tasks-header-container">
                <p class="header-label">In progress</p>
            </div>
            <ul class="tasks-container">
            </ul>            
        </div>
        <div id="done" class="tasks-category-container">
            <div class="tasks-header-container">
                <p class="header-label">Done</p>
            </div>
            <ul class="tasks-container">
            </ul> 
        </div>
        <div id="delete-class">
            <i class="fa-solid fa-trash-can"></i>
        </div>
    </main>
`;


export function loadHome() {

    const main = template.content.querySelector('main').cloneNode(true);

    document.body.appendChild(main);

    setupAddTaskButton();
    setupMemoryUpdater();
    renderTasks();

}
