import { logout } from "./api/data.js";
import { page, render } from "./lib.js";
import { navAction, userData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { updatePage } from "./views/update.js";
import { userFurniturePage } from "./views/user-furniture.js";

const root = document.querySelector(".root");

page(decorateContext);
page("/catalog", catalogPage);
page("/create", createPage);
page("/login", loginPage);
page("/register", registerPage);
page("/details/:id", detailsPage);
page("/edit/:id", updatePage);
page('/my-furniture', userFurniturePage);

page("**", "/catalog");
page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  ctx.userData = userData;
  next();
}

navAction(userData());

document.querySelector("#logoutBtn").addEventListener("click", async () => {
  await logout();
  navAction(userData());
  page.redirect("/catalog");
});
