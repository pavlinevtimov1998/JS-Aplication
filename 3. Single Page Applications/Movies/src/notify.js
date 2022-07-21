export function showNotify(err) {
  const notify = document.querySelector(".notify");
  const el = notify.querySelector(".err-message");

  el.textContent = err.message;

  notify.style.display = "block";

  setTimeout(() => (notify.style.display = "none"), 3000);
}
