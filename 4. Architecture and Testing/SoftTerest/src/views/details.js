import { deleteById, getWithId } from "../api/data.js";

const detailsPage = document.querySelector("#details");
let ctx;

export const showDetails = (id, ctxTarget) => {
  ctx = ctxTarget;
  detailsPage.style.display = "block";
  loadDetails(id);
};

async function loadDetails(id) {
  detailsPage.replaceChildren(ctx.spinner());

  const data = await getWithId(id);

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const fragment = document.createDocumentFragment();

  const img = ctx.createElements("img", {
    className: "det-img",
    src: data.img,
  });

  const divDesc = ctx.createElements("div", { className: "desc" });
  const h2 = ctx.createElements("h2", { className: "display-5" }, data.title);
  const p = ctx.createElements("p", { className: "infoType" }, "Description:");
  const pDescr = ctx.createElements(
    "p",
    { className: "idea-description" },
    data.description
  );
  divDesc.append(h2, p, pDescr);
  fragment.append(img, divDesc);

  if (userData && userData.id == data._ownerId) {
    const divBtn = ctx.createElements("div", { className: "text-center" });
    const a = ctx.createElements("a", { className: "btn detb" }, "Delete");
    a.setAttribute("data-id", id);
    a.addEventListener("click", onDelete);
    divBtn.appendChild(a);
    fragment.appendChild(divBtn);
  }

  detailsPage.replaceChildren(fragment);
}

async function onDelete(e) {
  e.preventDefault();

  await deleteById(e.target.dataset.id);

  ctx.goTo("catalog", ctx);
}
