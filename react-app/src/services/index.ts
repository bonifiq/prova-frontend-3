import axios from "axios";

export const jsonPlaceHolderService = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
});
