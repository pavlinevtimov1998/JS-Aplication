const sections = document.querySelectorAll(".section");
const userNav = document.querySelectorAll(".user");
const guestNav = document.querySelectorAll(".guest");
const addMovieBtn = document.querySelector("#add-movie-button");

export const hideAll = () => {
  [...sections].forEach((s) => (s.style.display = "none"));
};

export const spinner = () => {
  let p = document.createElement("p");
  p.textContent = "Loading ...";
  return p;
};

export const navAction = (user) => {
  if (user) {
    guestNav[0].style.display = "none";
    guestNav[1].style.display = "none";
    console.log(userNav);
    userNav[0].textContent = `Welcome, ${user.email}`;
    userNav[0].style.display = "block";
    userNav[1].style.display = "block";
    addMovieBtn.style.display = "block";
  } else {
    guestNav[0].style.display = "block";
    guestNav[1].style.display = "block";
    userNav[0].style.display = "none";
    userNav[1].style.display = "none";
    addMovieBtn.style.display = "none";
  }
};

export const isUser = () => {
  let user = sessionStorage.getItem("user");

  return JSON.parse(user);
};

export const userStorage = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export function createElements(element, content, attributes) {
  const el = document.createElement(element);

  if (content) {
    el.textContent = content;
  }

  if (attributes) {
    Object.entries(attributes).forEach(([a, n]) => {
      el.setAttribute(a, n);
    });
  }

  return el;
}
