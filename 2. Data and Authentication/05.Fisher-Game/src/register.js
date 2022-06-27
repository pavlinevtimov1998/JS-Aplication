import { showHome } from "./home.js";

const registerView = document.querySelector(".register-view");

export function showRegister() {
  registerView.style.display = "flex";
}

const inputEmail = registerView.querySelector('#register input[name="email"]');
const inputPassword = registerView.querySelector(
  '#register input[name="password"]'
);
const repeatPassword = registerView.querySelector(
  '#register input[name="rePass"]'
);

registerView
  .querySelector("#register button")
  .addEventListener("click", registration);

const registerUrl = "http://localhost:3030/users/register";

async function registration(e) {
  e.preventDefault();

  let email = inputEmail.value;
  let password = inputPassword.value;
  let rePass = repeatPassword.value;

  if (password !== rePass) {
    return alert("Password is not the same!");
  }

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status !== 200) {
      throw new Error("Try again");
    }

    const user = await response.json();

    sessionStorage.setItem("user", JSON.stringify(user));
    registerView.style.display = "none";
    showHome();
  } catch (err) {
    alert(err.message);
    inputEmail.value = "";
    inputPassword.value = "";
    repeatPassword.value = "";
  }
}
