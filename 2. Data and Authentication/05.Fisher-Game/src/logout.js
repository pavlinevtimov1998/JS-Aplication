import { showHome } from "./home.js";

export function logout() {
  sessionStorage.clear();

  showHome();
}
