function loadRepos() {
  const username = document.getElementById("username");
  const repos = document.getElementById("repos");

  const url = "https://api.github.com/users/k1r1L/repos";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      repos.innerHTML = "";

      data.forEach((element) => {
        const liElement = document.createElement("li");
        const anchorElement = document.createElement("a");

        anchorElement.textContent = element.full_name;
        anchorElement.setAttribute("href", element.html_url);

        liElement.appendChild(anchorElement);
        repos.appendChild(liElement);
      });
    });
}
