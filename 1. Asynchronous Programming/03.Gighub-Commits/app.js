function loadCommits() {
  const username = document.getElementById("username").value;
  const repo = document.getElementById("repo").value;

  const commits = document.getElementById("commits");

  const url = "https://api.github.com/repos";

  fetch(`${url}/${username}/${repo}/commits`)
    .then((response) => {
      commits.innerHTML = "";

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      
      data.forEach((e) => {
        const liElement = document.createElement("li");
        liElement.textContent = `${e.commit.author.name}: ${e.commit.message}`;

        commits.appendChild(liElement);
      });
    })
    .catch((err) => {
      const li = (createElement = document.createElement("li"));
      li.textContent = err;
      commits.appendChild(li);
    });
}
