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
