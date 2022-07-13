import { getWithId } from "./api/data.js";

const userNav = document.querySelectorAll(".user");
const guestNav = document.querySelectorAll(".guest");

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
    userNav[0].style.display = "block";
    userNav[1].style.display = "block";
    guestNav[0].style.display = "none";
    guestNav[1].style.display = "none";
  } else {
    userNav[0].style.display = "none";
    userNav[1].style.display = "none";
    guestNav[0].style.display = "block";
    guestNav[1].style.display = "block";
  }
}

export const detailsContext = async (ctx, next) => {
  const idea = await getWithId(ctx.params.id);

  ctx.idea = idea;

  next();
};
