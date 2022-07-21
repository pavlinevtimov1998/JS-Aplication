import { deleteMovie } from "../../api/data.js";

export async function delMovie(ctx) {
  await deleteMovie(ctx.params.id);

  ctx.page.redirect("/home");
}
