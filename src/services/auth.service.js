import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://swipyy.com/api/";
// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': 'JWT fefege...'
// }
const register = (values) => {
  const newValues = {};
  newValues.password = values.password;
  newValues.password_confirmation = values.password_confirmation;
  if (values.phone) {
    newValues.phone = '+' + values.phone;
  } else if (values.email) {
    newValues.email = values.email;
  }
  return axios
    .post(API_URL + "auth/signup", newValues, { headers: authHeader() })
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
const verifyUrl = (token) => {
  return axios
    .post(
      API_URL + "auth/verify/url",
      {
        token_data: token,
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
const login = (login_input, password) => {
  return axios
    .post(
      API_URL + "auth/login",
      {
        login_input,
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
const loginSocial = (name, email, avarar_img, accessToken) => {
  return axios
    .post(
      API_URL + "auth/login/social",
      {
        name,
        email,
        avarar_img,
        accessToken,
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
  verifyUrl,

  loginSocial,
};
