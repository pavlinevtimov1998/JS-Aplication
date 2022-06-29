import { showCatalogue } from "./catalog.js";
import { hideAll } from './util.js';

hideAll();
showCatalogue();
  


function logOut() {
  const logOutBtn = document.getElementById("logoutBtn");
  logOutBtn.addEventListener("click", (e) => {
    user.style.display = "none";
    guest.style.display = "block";
    sessionStorage.clear();
  });
}
