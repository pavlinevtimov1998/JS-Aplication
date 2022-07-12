const userNav = document.querySelectorAll(".user");
const guestNav = document.querySelectorAll(".guest");

export const navAction = (user) => {
  if (user !== null) {
    guestNav[0].style.display = "none";
    guestNav[1].style.display = "none";
    userNav[0].textContent = `Welcome, ${user.email}`;
    userNav[1].style.display = "block";
  } else {
    userNav[0].textContent = `Welcome, guest`;
    guestNav[0].style.display = "block";
    guestNav[1].style.display = "block";
    userNav[1].style.display = "none";
  }
};

export const userData = () => {
  let userData = JSON.parse(sessionStorage.getItem("userData"));

  return userData;
};

export const setUserData = (user) => {
  sessionStorage.setItem("userData", user);
};

export const removeUser = (user) => {
  sessionStorage.removeItem("userData");
};
