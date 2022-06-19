const form = document.querySelector(".login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = "http://localhost:3030/users/login";

  const data = new FormData(e.currentTarget);
  const email = data.get("email");
  const password = data.get("password");

  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body,
    });
    const answer = await response.json();
    if (response.status == 200) {
      sessionStorage.setItem("authToken", answer.accessToken);
      window.location.href = `http://127.0.0.1:5500/SoftUni%20CookBook%20Demo%20Project/index.html`;
    } else {
      throw new Error("Wrong email or password!");
    }
  } catch (err) {
    console.error(err.message);
  }
});
