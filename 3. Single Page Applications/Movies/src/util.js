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
  let userData = sessionStorage.getItem("userData");

  return JSON.parse(userData);
};

export const setUserData = (userData) => {
  sessionStorage.setItem("userData", JSON.stringify(userData));
};

export const removeUser = () => {
  sessionStorage.removeItem("userData");
};
