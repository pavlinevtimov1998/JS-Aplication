const url = `http://localhost:3030`;
const loadAllUrl = `${url}/data/recipes?select=_id%2Cname%2Cimg`;
const detailsRecipeUrl = `${url}/data/recipes`;

export const getRecipes = async () => {
  const response = await fetch(loadAllUrl);
  const data = await response.json();

  return data;
};

export const getDetails = async (id) => {
  const responce = await fetch(`${detailsRecipeUrl}/${id}`);
  const data = await responce.json();

  return data;
};
