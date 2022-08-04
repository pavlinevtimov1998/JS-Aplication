import { html } from "./lib.js";
import { getOne } from "./api/data.js";

export const editContext = async (ctx, next) => {
  ctx.render(html`<p>Loading &hellip;</p>`);

  const car = await getOne(ctx.params.id);

  ctx.car = car;

  next();
};
