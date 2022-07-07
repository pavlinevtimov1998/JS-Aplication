const viewSection = document.querySelector(".views");

export const spinner = () => {
  let p = document.createElement("p");
  p.textContent = "Loading ...";
  return p;
};

export const showSection = (section) => {
  viewSection.replaceChildren(section);
};

export function createElements(type, attributes, content) {
  const element = document.createElement(type);

  if (attributes) {
    Object.entries(attributes).forEach(([t, v]) => {
      element[t] = v;
    });
  }

  if (content) {
    element.textContent = content;
  }

  return element;
}
