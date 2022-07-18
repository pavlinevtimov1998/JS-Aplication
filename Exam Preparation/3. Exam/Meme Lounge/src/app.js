import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { detailsContext, navAction, userData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { welcomePage } from "./views/welcome.js";
import { profilePage } from "./views/profile.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

const root = document.querySelector("main");

page(decorateContext);
page("/login", loginPage);
page("/register", registerPage);
page("/home", welcomePage);
page("/catalog", catalogPage);
page("/edit/:id", detailsContext, editPage);
page("/create", createPage);
page("/details/:id", detailsContext, detailsPage);
page("/profile", profilePage);

userData() ? page("/", "/catalog") : page("/", "/home");

page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  ctx.userData = userData;
  next();
}

navAction(userData());

document.querySelector(".logout").addEventListener("click", async () => {
  await logout("logout");
  navAction(userData());
  page.redirect("/home");
});
