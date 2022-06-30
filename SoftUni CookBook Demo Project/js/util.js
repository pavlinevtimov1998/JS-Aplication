const views = document.querySelector("#views");

export const hideAll = () =>
  [...views.children].forEach((ch) => (ch.style.display = "none"));

export function createElements(el, text, className) {
  let element = document.createElement(el);

  if (text) {
    element.textContent = text;
  }

  if (className) {
    element.classList.add(className);
  }

  return element;
}
