
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
    [...document.querySelectorAll(".user")].forEach(
      (e) => (e.style.display = "inline")
    );
    [...document.querySelectorAll(".guest")].forEach(
      (e) => (e.style.display = "none")
    );
  } else {
    [...document.querySelectorAll(".user")].forEach(
      (e) => (e.style.display = "none")
    );
    [...document.querySelectorAll(".guest")].forEach(
      (e) => (e.style.display = "inline")
    );
  }
}

// export const detailsContext = async (ctx, next) => {
//   const idea = await getWithId(ctx.params.id);

//   ctx.idea = idea;

//   next();
// };
