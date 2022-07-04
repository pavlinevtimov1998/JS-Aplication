import { deleteById } from "../api/data.js";

export async function deleteMovie(id, ctx) {
  await deleteById(id);

  ctx.goTo("home", ctx);
}
