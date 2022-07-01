const mainUrl = "http://localhost:3030";
const allMovies = `${mainUrl}/data/movies`;
const loginUrl = `${mainUrl}/users/login`;
const registerUrl = `${mainUrl}/users/register`

async function request(method, url, body) {
  let options = {
    method,
  };

  if (method !== "GET") {
    options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

export const loadMovies = request.bind(null, "GET", allMovies);

export const loginRequest = request.bind(null, "POST", loginUrl);

export const registerRequest = request.bind(null, "POST", registerUrl);
