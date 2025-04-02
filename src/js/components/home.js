import '../../css/home.css';
import '../../css/task.css';

const template = document.createElement('template');

template.innerHTML = `
    <main>
        <div class="tasks-category-container">
            <div class="tasks-header-container">
                <p class="header-label">To-do</p>
            </div>
            <ul class="tasks-container">
                <li class="task-frame">
                    <div class="task">
                        <div class="task-title" contenteditable="true" data-placeholder="Título"></div>
                        <div class="task-description" contenteditable="true" data-placeholder="Descrição"></div>
                    </div>
                </li>
            </ul>
            <div class="new-task-button-container">
                <button class="new-task-button">+</button>
            </div>
        </div>
        <div class="tasks-category-container">
            <div class="tasks-header-container">
                <p class="header-label">In progress</p>
            </div>
            <ul class="tasks-container">
            </ul>            
            <div class="new-task-button-container">
                <button class="new-task-button">+</button>
            </div>
        </div>
        <div class="tasks-category-container">
            <div class="tasks-header-container">
                <p class="header-label">Done</p>
            </div>
            <ul class="tasks-container">
            </ul> 
            <div class="new-task-button-container">
                <button class="new-task-button">+</button>
            </div>
        </div>
    </main>
`;


export function loadHome() {

    const main = template.content.querySelector('main').cloneNode(true);

    // Adiciona o <nav> ao body
    document.body.appendChild(main);
}
