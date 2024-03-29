const userNav = document.querySelector("#profile");
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
    document.querySelector(".username").textContent = `Welcome ${
      userData().username
    }`;
    userNav.style.display = "inline";
    guestNav.style.display = "none";
  } else {
    userNav.style.display = "none";
    guestNav.style.display = "inline";
  }
}
