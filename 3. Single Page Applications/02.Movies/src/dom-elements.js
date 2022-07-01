export function loadingMovies(data, parent) {
  const div = createElements("div", undefined, { class: "card mb-4" });
  const img = createElements("img", undefined, {
    class: "card-img-top",
    src: data.img,
    alt: "Card image cap",
    width: "400",
  });
  const divTitle = createElements("div", undefined, { class: "card-body" });
  const title = createElements("h4", data.title, { class: "card-title" });
  divTitle.append(title);
  const divFooter = createElements("div", undefined, { class: "card-footer" });
  const a = createElements("a");
  const btnDetails = createElements("button", "Details", {
    type: "button",
    class: "btn btn-info",
    "data-id": data._id,
  });

  a.append(btnDetails);
  divFooter.append(a);
  div.append(img, divTitle, divFooter);

  parent.append(div);
}

function createElements(element, content, attributes) {
  const el = document.createElement(element);

  if (content) {
    el.textContent = content;
  }

  if (attributes) {
    Object.entries(attributes).forEach(([a, n]) => {
      el.setAttribute(a, n);
    });
  }

  return el;
}
