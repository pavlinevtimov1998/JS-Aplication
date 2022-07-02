import { updateRequest } from "./api-calls.js";
import { hideAll, isUser } from "./util.js";

const editPage = document.querySelector("#edit-movie");
const form = editPage.querySelector("form");

export const showEdit = (id, showDetails) => {
  hideAll();
  editPage.style.display = "block";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const [title, description, img] = [...formData.values()];

    if (title == "" || description == "" || img == "") {
      return;
    }

    const data = await updateRequest(
      { title, description, img },
      isUser().accessToken,
      id
    );

    showDetails(data._id, data._ownerId);
  });
};
