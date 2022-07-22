export function notify(message) {
  const element = document.querySelector(".overlay");
  const textContainer = element.querySelector("p");

  textContainer.textContent = message;
  element.style.display = "block";

  element.querySelector("a").addEventListener("click", (e) => {
    element.style.display = "none";
  });
}
