import { loadNav } from "./components/nav";
import { loadHome } from "./pages/home";

document.addEventListener("DOMContentLoaded", () => {
    loadNav(); 
});

console.log(window.innerWidth, window.innerHeight);