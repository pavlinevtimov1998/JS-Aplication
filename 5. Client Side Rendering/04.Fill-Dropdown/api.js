const url = "http://localhost:3030/jsonstore/advanced/dropdown";

export const getRequest = async () => await fetch(url);

export const postRequest = async (options) => await fetch(url, options);
