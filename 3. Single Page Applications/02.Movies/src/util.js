const sections = document.querySelectorAll(".section");
const userNav = document.querySelector(".user");
const guestNav = document.querySelectorAll(".guest");
const addMovieBtn = document.querySelector("#add-movie-button");

export const hideAll = () => {
  [...sections].forEach((s) => (s.style.display = "none"));
  console.log(sections);
};

export const navAction = (user) => {
  if (user) {
    guestNav[0].style.display = "none";
    guestNav[1].style.display = "none";
    userNav.style.display = "block";
    addMovieBtn.style.display = "block";
  } else {
    guestNav[0].style.display = "block";
    guestNav[1].style.display = "block";
    userNav.style.display = "none";
    addMovieBtn.style.display = "none";
  }
};

export const isUser = () => {
  let user = sessionStorage.getItem("user");

  return user
};

export const userStorage = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}