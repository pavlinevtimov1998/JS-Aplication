import { logout } from "./api/data.js";
import { page } from "./lib.js";
import { navAction, userData } from "./util.js";
import * as middleware from "./middlewares/detailsMiddleware.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

document.querySelector("#logout").addEventListener("click", onLogout);

page(middleware.decorateContext);
page("/home", homePage);
page("/create", createPage);
page("/details/:id", middleware.detailsContext, detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/edit/:id", middleware.editContext, editPage);

page("**", "/home");

page.start();

navAction(userData());

async function onLogout() {
  await logout();
  navAction(userData());
  page("/home");
}
