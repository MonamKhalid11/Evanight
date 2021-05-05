import axios from "axios";

export const baseURL = "https://evanight-api.herokuapp.com";

export const log = (token, formData) =>
  axios.create({
    baseURL: baseURL, // https://evanight-api.herokuapp.com //
    //
    timeout: 5000,
    headers: token && {
      Authorization: `Bearer ${token}`,
      contentType: formData ? "multipart/form-data" : "application/json",
    },
  });
