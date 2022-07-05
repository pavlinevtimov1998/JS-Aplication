const host = "http://localhost:3030";
const registrationUrl = '/users/register';
const loginUrl = '';
const logoutUrl = '';

async function request(url, options) {
  try {
    const response = await fetch(host + url, options);

    if (response.ok !== true) {
      if (response.status == 403) {
        sessionStorage.removeItem("userData");
      }

      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

const createOptions = (method, data) => {
  let options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options["body"] = JSON.stringify(data);
  }

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  if (userData != null) {
    options.headers["X-Authorization"] = userData.token;
  }

  return options;
};

export const getRequest = async (url) => request(url, createOptions("GET"));

export const postRequest = async (url, data) => {
  return request(url, createOptions("POST", data));
};

export const putRequest = async (url, data) => {
  return request(url, createOptions("PUT", data));
};

export const delRequest = async (url) => request(url, createOptions("DELETE"));

export async function login(email, password) {
  const result = await postRequest(loginUrl, { email, password });

  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };

  sessionStorage.setItem("userData", JSON.stringify(userData));
}

export async function register(email, password) {
  const result = await postRequest(registrationUrl, { email, password });

  const userData = {
    email: result.email,
    id: result._id,
    token: result.accessToken,
  };

  sessionStorage.setItem("userData", JSON.stringify(userData));
}

export async function logout() {
  await getRequest(logoutUrl);
  sessionStorage.removeItem("userData");
}
