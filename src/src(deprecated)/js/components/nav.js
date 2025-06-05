import { navigateTo } from '../router.js';
import '../../css/nav.css';



const template = document.createElement('template');
let menuOpen = false;

template.innerHTML = `
    <nav>
        <header contenteditable="false">
            <div id="avatar" contenteditable="false">A</div>
            <button type="button" contenteditable="false">
                <img src="images/open_nav_button_icon.svg" alt="Menu fechado">
            </button>
        </header>
        <ul>
            <li id="home">
                Home
                <i class="material-icons">chevron_right</i>
            </li>
            <li id="configs">
                Configs
                <i class="material-icons">chevron_right</i>
            </li>
        </ul>
    </nav>
`;

function setupNavToggle() {

    const nav = document.querySelector('nav');
    const button = nav.querySelector('header button');
    const avatar = nav.querySelector('#avatar');
    const ul = nav.querySelector('ul');

    button.addEventListener('click', () => {

        menuOpen = !menuOpen;

        nav.classList.toggle('expanded');
        avatar.classList.toggle('expanded');
        ul.classList.toggle('expanded');
        button.classList.toggle('expanded');

        if(menuOpen) {
            button.querySelector('img').src = 'images/close_nav_button_icon.svg';
        } else {
            button.querySelector('img').src = 'images/open_nav_button_icon.svg';
        }
    });

}

function setupRouter() {
    const nav = document.querySelector('nav');
    const ul = nav.querySelector('ul');

    ul.addEventListener('click', (event) => {
        const target = event.target.closest('li');
        console.log(target);

        if (target) {
            const route = "/" + target.id;

            navigateTo(route);
        }
    });
}

export function loadNav() {

    // Clona o conteúdo do template e retorna o <nav>
    const nav = template.content.querySelector('nav').cloneNode(true);

    // Adiciona o <nav> ao body
    document.body.appendChild(nav);

    // Configura o botão de toggle do menu
    setupNavToggle()

    setupRouter();
    navigateTo("/")
}