async function solution() {
  const main = document.getElementById("main");

  const url = "http://localhost:3030/jsonstore/advanced/articles/list";
  const response = await fetch(url);
  const data = await response.json();

  data.forEach((d) => {
    main.append(createArticles(d.title, d._id));
  });

  async function showMore(e) {
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`;

    const response = await fetch(url);
    const content = await response.json();

    const article = e.target.parentNode.parentNode;
    article.children[1].children[0].textContent = content.content;

    if (e.target.textContent == "More") {
      article.children[1].classList.remove("extra");
      e.target.textContent = "Less";
    } else {
      article.children[1].classList.add("extra");
      e.target.textContent = "More";
    }
  }

  function createArticles(title, id) {
    const divAcordeon = createElement("div", undefined, "accordion");
    const divHead = createElement("div", undefined, "head");
    const spanTitle = createElement("span", title);
    const button = createElement("button", "More", "button");
    button.setAttribute("id", id);
    const extraInfo = createElement("div", undefined, "extra");
    const paragraph = createElement("p");

    button.addEventListener("click", showMore);

    divHead.append(spanTitle, button);
    extraInfo.append(paragraph);
    divAcordeon.append(divHead, extraInfo);

    return divAcordeon;
  }

  function createElement(el, text, className) {
    let element = document.createElement(el);

    if (text) {
      element.textContent = text;
    }

    if (className) {
      element.classList.add(className);
    }

    return element;
  }
}
solution();
