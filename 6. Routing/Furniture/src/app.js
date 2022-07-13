import { page, render } from "./lib.js";
import { navAction, userData } from "./util.js";
import { catalogPage } from "./views/catalog.js";

const root = document.querySelector(".root");

page(decorateContext);
page("/catalog", catalogPage);
// page("/create", );
// page("/login", );
// page("/register", );
// page("/details/:id",);
// page('/edit',);
// page('/my-furniture')

page("**", "/catalog");
page.start();

async function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.navAction = navAction;
  next();
}

navAction(userData());
