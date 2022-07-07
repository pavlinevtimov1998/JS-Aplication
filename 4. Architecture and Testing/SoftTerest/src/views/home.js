const homePage = document.querySelector("#home-page");
homePage.remove();
const getStartedBtn = homePage.querySelector("#get-started");
let ctx;

export const showHome = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.showSection(homePage);
};

getStartedBtn.addEventListener("click", onGetStarted);

async function onGetStarted(e) {
  e.preventDefault();

  ctx.goTo("catalog", ctx);
}
