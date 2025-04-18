import '../../css/configs.css';

const template = document.createElement('template');

template.innerHTML = `
    <main>
        <div class="config-container">
            <div class="header-container">
                <p class="header-label">Change Blacground</p>
            </div>
            <div class="upload-container">
                <i class="material-icons ">upload_file</i>
            </div>
        </div>
    </main>
`;


export function loadConfigsPage() {

    console.log('Loading configs page');
    const main = template.content.querySelector('main').cloneNode(true);

    document.body.appendChild(main);

}
