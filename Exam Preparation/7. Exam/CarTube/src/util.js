const userNav = [...document.querySelectorAll(".user")];
const guestNav = [...document.querySelectorAll(".guest")];

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
  } else {
    userNav.forEach((e) => (e.style.display = "none"));
    guestNav.forEach((e) => (e.style.display = "inline"));
  }
}
