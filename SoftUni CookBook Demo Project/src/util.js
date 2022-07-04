const views = document.querySelector("#views");

const userNav = document.querySelector("#user");
const guestNav = document.querySelector("#guest");

export const spinner = () => {
  let p = document.createElement("p");
  p.textContent = "Loading ...";
  return p;
};

export const userNavigation = () => {
  const user = JSON.parse(sessionStorage.getItem("userData"));

  if (user) {
    userNav.style.display = "inline-block";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline-block";
  }
};

export const hideAll = () =>
  [...views.children].forEach((ch) => (ch.style.display = "none"));

