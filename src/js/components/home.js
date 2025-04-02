import '../../css/home.css';

export function loadHome() {
    const template = document.createElement('template');

    template.innerHTML = `
        <main>
            <div class="tasks-category-container">
                <div class="tasks-header-container">
                    <p class="header-label">To-do</p>
                </div>
                <div class="new-task-button-container">
                    <button class="new-task-button">+</button>
                </div>
            </div>
            <div class="tasks-category-container">
                <div class="tasks-header-container">
                    <div class="header-label">
                        <p>In progress</p>
                    </div>
                </div>
                <div class="new-task-button-container">
                    <button class="new-task-button">+</button>
                </div>
            </div>
            <div class="tasks-category-container">
                <div class="tasks-header-container">
                    <div class="header-label">
                        <p>Done</p>
                    </div>
                </div>
                <div class="new-task-button-container">
                    <button class="new-task-button">+</button>
                </div>
            </div>
        </main>
    `;


    const main = template.content.querySelector('main').cloneNode(true);

    // Adiciona o <nav> ao body
    document.body.appendChild(main);
}
