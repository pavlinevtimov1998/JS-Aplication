const views = document.querySelector("#views");

const userNav = document.querySelector("#user");
const guestNav = document.querySelector("#guest");

export const rout = (target, router) => {
  const url = new URL(target.href);
  let action = router[url.pathname];
  action();

  return url.pathname;
};

export const activeNavButton = () => {
  [...views.children].forEach((ch) => {
    if (ch.style.display == "block") {
      document.querySelector(".active").classList.remove("active");
      document.querySelector(`a[href="/${ch.id}"]`).classList.add("active");
    }
  });
};

export const userNavigation = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

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

export function createElements(el, text, className) {
  let element = document.createElement(el);

  if (text) {
    element.textContent = text;
  }

  if (className) {
    element.classList.add(className);
  }

  return element;
}

export const userStorige = (user) =>
  sessionStorage.setItem("user", JSON.stringify(user));
