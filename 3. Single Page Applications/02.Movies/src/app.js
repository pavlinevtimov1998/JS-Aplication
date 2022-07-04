// import { showCreate } from "./create.js";
// import { showHome } from "./home.js";
// import { showLogin } from "./login.js";
// import { showRegister } from "./register.js";
// import { hideAll, isUser, navAction } from "./util.js";
import * as api from './api/data.js';

window.api = api;

// hideAll();
// navAction(isUser());
// showHome();

// const route = {
//   "/movies": showHome,
//   "/login": showLogin,
//   "/logout": logout,
//   "/register": showRegister,
//   "/create": showCreate,
// };

// document.querySelector(".navbar").addEventListener("click", navigate);
// document.querySelector("#add-movie-button").addEventListener("click", navigate);

// function navigate(e) {
//   e.preventDefault();

//   if (e.target.tagName == "A" && e.target.href) {
//     let url = new URL(e.target.href);
//     let show = route[url.pathname];
//     if (typeof show == "function") {
//       hideAll();
//       show();
//     }
//   }
// }

// function logout() {
//   sessionStorage.clear();
//   showLogin();
//   navAction();
// }
