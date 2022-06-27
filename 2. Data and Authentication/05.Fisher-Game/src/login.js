import { showHome } from "./home.js";

const loginPage = document.querySelector(".login-view");

export function showLogin() {
  loginPage.style.display = "flex";
}

const loginUrl = "http://localhost:3030/users/login";
const inputEmail = loginPage.querySelector('#login input[name="email"]');
const inputPassword = loginPage.querySelector('#login input[name="password"]');

const btnLogin = loginPage.querySelector("#login button");

btnLogin.addEventListener("click", login);

async function login(e) {
  e.preventDefault();

  let email = inputEmail.value;
  let password = inputPassword.value;

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const user = await response.json();
    sessionStorage.setItem("user", JSON.stringify(user));

    loginPage.style.display = "none";
    showHome();
  } catch (err) {
    alert(err.message);
    inputEmail.value = "";
    inputPassword.value = "";
  }
}
