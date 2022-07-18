import { html } from "./lib.js";
import { getMemeById } from "./api/data.js";

const userNav = [...document.querySelector(".user").children];
const guestNav = [...document.querySelector(".guest").children];
const welcomeUser = document.querySelector(".welcome-user");

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
    userNav.forEach((e) => (e.style.display = "inline"));
    guestNav.forEach((e) => (e.style.display = "none"));
    welcomeUser.textContent = `Welcome, ${user.email}`;
  } else {
    userNav.forEach((e) => (e.style.display = "none"));
    guestNav.forEach((e) => (e.style.display = "inline"));
  }
}

export const detailsContext = async (ctx, next) => {
  ctx.render(html`<h1 style="text-align: center">Loading &hellip;</h1>`);

  const meme = await getMemeById(ctx.params.id);

  ctx.meme = meme;

  next();
};

export const notify = (message) => {
  const container = document.querySelector("#errorBox");
  const element = container.querySelector("span");

  container.style.display = "block";
  element.textContent = message;

  setTimeout(() => (container.style.display = "none"), 3000);
};
