import { getGameDetails } from "./api/data.js";
import { html } from "./lib.js";

const userNav = document.querySelector("#user");
const guestNav = document.querySelector("#guest");

export const userData = () => {
  let user = JSON.parse(sessionStorage.getItem("userData"));

  return user;
};

export const setUserData = (user) => {
  sessionStorage.setItem("userData", JSON.stringify(user));
};

export const removeUserData = () => {
  sessionStorage.removeItem("userData");
};

export function navAction(user) {
  if (user) {
    userNav.style.display = "inline";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline";
  }
}

export const spinner = () =>
  html`<article class="spinner"><h1>Loading &hellip;</h1></article>`;

export const detailsContext = async (ctx, next) => {
  ctx.render(spinner());

  const game = await getGameDetails(ctx.params.id);

  ctx.game = game;

  next();
};
