import axios from "axios";

export function getPosts() {
  return axios
    .get("https://dummyjson.com/products", {
      params: {
        limit: 10,
      },
    })
    .then((resp) => resp.data);
}
