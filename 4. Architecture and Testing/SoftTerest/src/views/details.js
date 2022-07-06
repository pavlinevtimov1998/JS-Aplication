import { getWithId } from "../api/data.js";

const detailsPage = document.querySelector("#details");
let ctx;

export const showDetails = async (id, ctxTarget) => {
  console.log(id);
  ctx = ctxTarget;
  ctx.hideAll();
  detailsPage.style.display = "block";
  details(id);
};

async function details(id) {
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

  console.log(userData.id, data._ownerId);

  if (userData.id == data._ownerId) {
    const divBtn = ctx.createElements("div", { className: "text-center" });
    const a = ctx.createElements("a", { className: "btn detb" }, "Delete");
    divBtn.appendChild(a);
    fragment.appendChild(divBtn);
  }

  detailsPage.replaceChildren(fragment);
}

/*        <img class="det-img" src="./images/dinner.jpg" />
    <div class="desc">
          <h2 class="display-5">Dinner Recipe</h2>
          <p class="infoType">Description:</p>
          <p class="idea-description">
            There are few things as comforting as heaping bowl of pasta at the
            end of a long day. With so many easy pasta recipes out there,
            there's something for every palate to love. That's why pasta makes
            such a quick, easy dinner for your family—it's likely to satisfy
            everyone's cravings, due to its versatility.
          </p>
    </div>
<div class="text-center">
      <a class="btn detb" href="">Delete</a>
</div> */
