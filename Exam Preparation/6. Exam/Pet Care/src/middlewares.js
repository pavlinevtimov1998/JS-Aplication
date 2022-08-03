import { getOne } from "./api/data.js";

export const detailsContext = async (ctx, next) => {
  const animal = await getOne(ctx.params.id);

  ctx.animal = animal;

  next();
};
