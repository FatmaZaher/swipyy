import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://test-place.site/api/";
// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': 'JWT fefege...'
// }
const register = (email, password, password_confirmation) => {
  return axios
    .post(
      API_URL + "auth/signup",
      {
        // name,
        email,
        password,
        password_confirmation,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      console.log(response);
      const token = response.data.data.access_token;
      if (token) {
        localStorage.setItem("user_token", token);
      }
      return response.data;
    });
};
const verify = (code) => {
  return axios
    .post(
      API_URL + "user/verify",
      {
        code,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      const token = response.data.data.access_token;
      if (token) {
        localStorage.setItem("user_token", token);
        const headers = JSON.stringify({
          headers: {
            Authorization: "Bearer " + response.data.data.access_token,
          },
        });
        localStorage.setItem("headers", headers);
      }
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(
      API_URL + "auth/login",
      {
        email,
        password,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      // const token = response.data.data.access_token
      // if (token) {
      //   localStorage.setItem("user_token", token);
      // }

      return response.data;
    });
};
const user = () => {
  return axios
    .get(API_URL + "user", { headers: authHeader() })
    .then((response) => {
      //if (response.data.token) {
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  user,
  verify,
};
