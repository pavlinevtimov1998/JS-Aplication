import { getAllIdeas } from "../api/data.js";

const catalogPage = document.querySelector("#dashboard-holder");
catalogPage.remove();
let ctx;

export const showCatalog = (ctxTarget) => {
  ctx = ctxTarget;
  ctx.showSection(catalogPage);
  showAllIdeas();
};

async function showAllIdeas() {
  catalogPage.replaceChildren(ctx.spinner());

  const data = await getAllIdeas();

  if (data.length > 0) {
    catalogPage.replaceChildren(loadCatalog(data));
  } else {
    catalogPage.replaceChildren(
      ctx.createElements("h1", undefined, "No ideas yet! Be the first one :)")
    );
  }
}

function loadCatalog(data) {
  const fragment = document.createDocumentFragment();

  data.forEach((d) => {
    const div = ctx.createElements("div", {
      className: "card overflow-hidden current-card details",
    });

    div.style.width = "20rem";
    div.style.height = "18rem";

    const cardDiv = ctx.createElements("div", { className: "card-body" });
    const p = ctx.createElements("p", { className: "card-text" }, d.title);
    cardDiv.appendChild(p);

    const img = ctx.createElements("img", {
      className: "card-image",
      src: d.img,
      alt: "Card image cap",
    });

    const a = ctx.createElements("a", { className: "btn" }, "Details");
    a.setAttribute("data-id", d._id);

    a.addEventListener("click", (e) => {
      e.preventDefault();
      
      ctx.goTo("details", e.target.dataset.id, ctx);
    });

    div.append(cardDiv, img, a);
    fragment.appendChild(div);
  });

  return fragment;
}
