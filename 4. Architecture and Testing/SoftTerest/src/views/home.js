const homePage = document.querySelector("#home-page");
const getStartedBtn = homePage.querySelector("#get-started");
let ctx;

export const showHome = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.hideAll();
  homePage.style.display = "block";
};

getStartedBtn.addEventListener("click", onGetStarted);

async function onGetStarted(e) {
  e.preventDefault();

  ctx.goTo("catalog", ctx);
}
