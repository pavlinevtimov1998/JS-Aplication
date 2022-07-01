const mainUrl = "http://localhost:3030";
const allMovies = `${mainUrl}/data/movies`;

async function request(method, url) {
  let options = {
    method,
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}


export const loadMovies = request.bind(null, 'GET', allMovies);