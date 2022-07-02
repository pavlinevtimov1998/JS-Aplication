const mainUrl = "http://localhost:3030";
const allMoviesUrl = `${mainUrl}/data/movies`;
const loginUrl = `${mainUrl}/users/login`;
const registerUrl = `${mainUrl}/users/register`;
const likeUrl = `${mainUrl}/data/likes`;
const updateUrl = `${mainUrl}/data/movies`;

async function request(method, url, body, accessToken, id) {
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

  if (accessToken) {
    options["headers"]["X-Authorization"] = accessToken;
  }

  if (id) {
    url += `/${id}`;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

export const loadMovies = request.bind(null, "GET", allMoviesUrl);

export const loginRequest = request.bind(null, "POST", loginUrl);

export const registerRequest = request.bind(null, "POST", registerUrl);

export const addMovie = request.bind(null, "POST", allMoviesUrl);

export const detailsRequest = request.bind(null, "GET", allMoviesUrl);

export const likeRequest = request.bind(null, "GET");

export const onLike = request.bind(null, "POST", likeUrl);

export const updateRequest = request.bind(null, 'PUT', updateUrl);
