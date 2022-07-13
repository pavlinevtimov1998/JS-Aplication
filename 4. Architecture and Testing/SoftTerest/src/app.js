import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showHome } from "./views/home.js";
import { showDetails } from "./views/details.js";
import { logout } from "./api/data.js";
import { detailsContext, navAction, userData } from "./util.js";
import { page, render } from "./lib.js";

const root = document.querySelector(".views");

page(decorateContext);
page("/home", showHome);
page("/catalog", showCatalog);
page("/create", showCreate);
page("/login", showLogin);
page("/register", showRegister);
page("/details/:id", detailsContext, showDetails);

page("/index.html", "/home");
page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  next();
}

document.querySelector(".logout").addEventListener("click", async (e) => {
  await logout();
  navAction(userData());
  page.redirect("/home");
});

navAction(userData());
