const form = document.querySelector(".registration");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = "http://localhost:3030/users/register";

  const data = new FormData(e.currentTarget);
  let email = data.get("email");
  let pass = data.get("password");
  let rePass = data.get("rePass");

  if (pass !== rePass) {
    return console.error("Passwords don't match");
  }

  const body = JSON.stringify({
    email,
    password: pass,
  });

  console.log(body);

  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    });

    const answer = await response.json();
    if (response.status == 200) {
      sessionStorage.setItem("authToken", answer.accessToken);
      window.location.href =
        "http://127.0.0.1:5500/SoftUni%20CookBook%20Demo%20Project/index.html";
    } else {
      throw new Error(answer.message);
    }
  } catch (err) {
    console.error(err.message);
  }
});
