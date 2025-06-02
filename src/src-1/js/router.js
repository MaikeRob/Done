import { loadHome } from "./pages/home";
import { loadConfigsPage } from "./pages/configs";

const routes = {
    "/": loadHome,
    "/home": loadHome,
    "/configs": loadConfigsPage
}

export function navigateTo(route) {
    const main = document.querySelector('main');
    if (main) {
        main.remove();
    }

    console.log(route);

    const loadPage = routes[route] || loadHome;
    console.log('Loading page:', loadPage);
    loadPage();
}
