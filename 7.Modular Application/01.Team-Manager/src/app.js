import { logout } from "./api/user.js";
import { page, render } from "./lib.js";
import { navAction, userData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/./details/details.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { updatePage } from "./views/update.js";
import { userTeamsPage } from "./views/userTeams.js";

const root = document.querySelector(".root");

page(decorateContext);
page("/home", homePage);
page("/catalog", catalogPage);
page("/create", createPage);
page("/login", loginPage);
page("/register", registerPage);
page("/details/:id", detailsPage);
page("/edit/:id", updatePage);
page("/myteams", userTeamsPage);

page("/", "/home");
page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  ctx.userData = userData;
  next();
}

navAction(userData());

document.querySelector(".logout").addEventListener("click", async () => {
  await logout();
  page.redirect("/home");
});
