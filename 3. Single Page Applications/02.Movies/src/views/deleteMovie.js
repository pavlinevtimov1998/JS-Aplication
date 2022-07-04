// import { deleteRequest } from "./api-calls.js";
// import { isUser } from "../util.js";

export async function deleteMovie(id, showHome) {
  await deleteRequest(undefined, isUser().accessToken, id);

  showHome();
}
