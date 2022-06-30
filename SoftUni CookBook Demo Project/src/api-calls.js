const mainUrl = `http://localhost:3030`;
const loadAllUrl = `${mainUrl}/data/recipes?select=_id%2Cname%2Cimg`;
const detailsRecipeUrl = `${mainUrl}/data/recipes`;
const loginUrl = `${mainUrl}/users/login`;
const registrationUrl = `${mainUrl}/users/register`;
const createRecipeUrl = `${mainUrl}/data/recipes`;

async function request(method, url, body, id, accessToken) {
  let options = {
    method: "GET",
  };

  if (method !== "GET") {
    options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options["body"] = JSON.stringify(body);
    }

    if (accessToken) {
      options.headers["X-Authorization"] = accessToken;
    }
  }

  if (id) {
    url += `/${id}`;
  }

  console.log(options);

  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

export const getRecipes = request.bind(null, "GET", loadAllUrl);

export const getDetails = request.bind(
  null,
  "GET",
  detailsRecipeUrl,
  undefined
);

export const loginUser = request.bind(null, "POST", loginUrl);

export const registerUser = request.bind(null, "POST", registrationUrl);

export const creatingRecipe = request.bind(null, "POST", createRecipeUrl);

export const updateRecipe = request.bind(null, "PUT", createRecipeUrl);

export const deleteRecipe = request.bind(null, "DELETE", createRecipeUrl, undefined);
