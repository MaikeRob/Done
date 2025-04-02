import { loadNav } from "./components/nav";
import { loadHome } from "./components/home";

document.addEventListener("DOMContentLoaded", () => { 
    loadNav(); 
    loadHome();
});

console.log(window.innerWidth, window.innerHeight);