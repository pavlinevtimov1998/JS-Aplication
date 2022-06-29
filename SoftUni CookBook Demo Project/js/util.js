const views = document.querySelector("#views");

export const hideAll = () =>
  [...views.children].forEach((ch) => (ch.style.display = "none"));
