const booksUrl = "http://localhost:3030/jsonstore/collections/books";

async function request(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    alert(err.message);
    throw err.message;
  }
}

const options = (method, body) => {
  let opt = {
    method,
  };

  if (body) {
    opt.headers = {
      "Content-Type": "application/json",
    };
    opt.body = JSON.stringify(body);
  }

  return opt;
};

export const getRequest = async () => await request(booksUrl, options("GET"));

export const postRequest = async (body) =>
  await request(booksUrl, options("POST", body));

export const getById = async (id) =>
  await response(booksUrl + id, options("GET"));

export const putRequest = async (body, id) =>
  await request(booksUrl + id, options("PUT", body));

export const deleteById = async (id) =>
  await request(booksUrl + id, options("DELETE"));
