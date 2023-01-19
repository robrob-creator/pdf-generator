import axios from "axios";
import store from "store";

const apiClient = axios.create({
  baseURL: "http://node-env.eba-uinfrsze.us-west-1.elasticbeanstalk.com/",

  // baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
  },
});
console.log("you made it");
apiClient.interceptors.request.use((request) => {
  const accessToken = store.get("accessToken");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
    request.headers.AccessToken = accessToken;
  }
  return request;
});

apiClient.interceptors.response.use(undefined, (error) => {
  // Errors handling
  return Promise.reject(error);
  // const { response } = error
  // const { data } = response
  // if (data) {
  //   if (data.errors) {
  //     return errorParser(data.errors)
  //   }
  //   return errorParser(data)
  // }
  // return data
});

export default apiClient;
