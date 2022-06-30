const mainUrl = `http://localhost:3030`;
const loadAllUrl = `${mainUrl}/data/recipes?select=_id%2Cname%2Cimg`;
const detailsRecipeUrl = `${mainUrl}/data/recipes`;
const loginUrl = `${mainUrl}/users/login`;

async function request(method, url, body, id) {
  let options = {
    method: "GET",
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

  if (id) {
    url += `/${id}`;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

export const getRecipes = request.bind(null, 'GET', loadAllUrl);

export const getDetails = request.bind(null, 'GET', detailsRecipeUrl, undefined);

export const loginUser = request.bind(null, 'POST', loginUrl)
