const userNav = [...document.querySelector(".user").children];
const guestNav = [...document.querySelector(".guest").children];

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

// export const detailsContext = async (ctx, next) => {
//   const idea = await getWithId(ctx.params.id);

//   ctx.idea = idea;

//   next();
// };
