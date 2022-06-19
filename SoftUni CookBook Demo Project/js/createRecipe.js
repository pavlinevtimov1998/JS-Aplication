const form = document.querySelector(".create-recipe");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = "http://localhost:3030/data/recipes";

  const imgUrlValidation =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/m;

  const data = new FormData(e.currentTarget);

  const name = data.get("name");
  const img = data.get("img");
  const ingredients = data.get("ingredients").split("\n");
  const steps = data.get("steps").split("\n");

  if (name == "" || img == "" || ingredients == "" || steps == "") {
    return alert("Empty inputs!");
  } else if (img.match(imgUrlValidation) == null) {
    return alert('Invalid image URL!');
  }

  const body = JSON.stringify({
    name,
    img,
    ingredients,
    steps,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": sessionStorage.getItem("authToken"),
    },
    body,
  });

  const answer = await response.json();

  window.location.href =
    "http://127.0.0.1:5500/SoftUni%20CookBook%20Demo%20Project/index.html";
});
