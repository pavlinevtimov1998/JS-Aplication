function attachEvents() {
  const inputLocation = document.getElementById("location");
  const resultForecast = document.getElementById("forecast");
  const current = document.getElementById("current");
  const upcomingDays = document.getElementById("upcoming");
  resultForecast.style.display = "none";

  const locationsUrl = "http://localhost:3030/jsonstore/forecaster/locations";
  const todayWeatherUrl = "http://localhost:3030/jsonstore/forecaster/today";
  const threeDaysWeatherUrl =
    "http://localhost:3030/jsonstore/forecaster/upcoming";

  const weatherSymbols = {
    Sunny: "\u2600",
    "Partly sunny": "\u26C5",
    Overcast: "\u2601",
    Rain: "\u2614",
    Degrees: "\u00B0",
  };

  document.getElementById("submit").addEventListener("click", showWeather);

  function showWeather(e) {
    e.preventDefault();

    const conditionElement = document.querySelector("#current .forecasts");
    const upcomingElement = document.querySelector("#upcoming .forecast-info");

    if (conditionElement !== null && upcomingElement !== null) {
      conditionElement.remove();
      upcomingElement.remove();
    }

    let text = inputLocation.value;
    if (text == "") {
      return;
    }

    fetch(locationsUrl)
      .then((response) => response.json())
      .then((locations) => {
        let corespondingData = locations.find((d) => d.name === text);
        if (corespondingData == undefined) {
          throw new Error();
        }

        fetch(`${todayWeatherUrl}/${corespondingData.code}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            today(data);
          });

        fetch(`${threeDaysWeatherUrl}/${corespondingData.code}`)
          .then((response) => {
            
            return response.json();
          })
          .then((data) => {
            upcoming(data);
          });
      })
      .catch((err) => {
        resultForecast.style.display = "block";
        resultForecast.textContent = `${err}`;
      });
  }

  function today(obj) {
    const forecasts = createElement("div", undefined, "forecasts");
    const symbol = createElement(
      "span",
      weatherSymbols[obj.forecast.condition],
      "condition"
    );
    symbol.classList.add("symbol");
    const condition = createElement("span", undefined, "condition");
    const location = createElement("span", obj.name, "forecast-data");
    const degrees = createElement(
      "span",
      `${obj.forecast.high}${weatherSymbols.Degrees}/${obj.forecast.low}${weatherSymbols.Degrees}`,
      "forecast-data"
    );
    const weather = createElement(
      "span",
      `${obj.forecast.condition}`,
      "forecast-data"
    );

    condition.append(location, degrees, weather);
    forecasts.append(symbol, condition);

    current.append(forecasts);
    resultForecast.style.display = "block";
  }

  function upcoming(data) {
    const div = createElement("div", undefined, "forecast-info");
    data.forecast.forEach((d) => {
      const span = createElement("span", undefined, "upcoming");
      const symbol = createElement(
        "span",
        weatherSymbols[d.condition],
        "symbol"
      );
      const degrees = createElement(
        "span",
        `${d.low}${weatherSymbols.Degrees}/${d.high}${weatherSymbols.Degrees}`,
        "forecast-data"
      );
      const weather = createElement("span", d.condition, "forecast-data");
      span.append(symbol, degrees, weather);
      div.append(span);
    });
    upcomingDays.append(div);
  }

  function createElement(el, text, className) {
    let element = document.createElement(el);

    if (text) {
      element.textContent = text;
    }

    if (className) {
      element.classList.add(className);
    }

    return element;
  }
}

attachEvents();
