function getInfo() {
  const inputId = document.getElementById("stopId");
  const stopName = document.getElementById("stopName");
  const busList = document.getElementById("buses");

  const url = "http://localhost:3030/jsonstore/bus/businfo";

  stopName.innerHTML = "Loading...";
  busList.innerHTML = "";

  fetch(`${url}/${inputId.value}`)
    .then((response) => {
      if (response.status !== 200 || inputId.value == "") {
        throw Error();
      }

      return response.json();
    })
    .then((data) => {
      stopName.textContent = data.name;

      Object.entries(data.buses).forEach((b) => {
        const liElement = document.createElement("li");
        liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;

        console.log(liElement.textContent);
        busList.appendChild(liElement);
      });
    })
    .catch((err) => {
      stopName.textContent = `${err}`;
    });
}
