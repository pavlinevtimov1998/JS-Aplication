import { html } from "./lib.js";
import { getAllApplications, getOneOffer, getSpecificApp } from "./api/data.js";

export const detailsContext = async (ctx, next) => {
  ctx.render(html`<div class="offer"><h3>Loading &hellip;</h3></div>`);

  let offer, totalApplications, specificApp;

  if (ctx.userData()) {
    [offer, totalApplications, specificApp] = await Promise.all([
      getOneOffer(ctx.params.id),
      getAllApplications(ctx.params.id),
      getSpecificApp(ctx.params.id, ctx.userData().id),
    ]);
    ctx.specificApp = specificApp;
  } else {
    [offer, totalApplications] = await Promise.all([
      getOneOffer(ctx.params.id),
      getAllApplications(ctx.params.id),
    ]);
  }

  ctx.offer = offer;
  ctx.totalApps = totalApplications;

  next();
};
