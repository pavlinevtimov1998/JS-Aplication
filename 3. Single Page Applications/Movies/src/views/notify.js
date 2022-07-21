export function showNotify(message) {
  const notify = document.querySelector(".notify");
  const el = notify.querySelector(".err-message");

  el.textContent = message;

  notify.style.display = "block";

  setTimeout(() => (notify.style.display = "none"), 3000);
}
