import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (name, email, password) => (dispatch) => {
  return AuthService.register(name, email, password).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      // return dispatch(user())
      // return Promise.resolve();
      return response;
    },
    (error) => {
      console.log(error.response);
      const message = error.response.data.status.message;

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const verify = (code) => (dispatch) => {
  return AuthService.verify(code).then(
    (data) => {
      console.log(data);

      return dispatch(user());
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: VERIFY_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      console.log(data);

      localStorage.setItem("user_token", data.data.access_token);
      const headers = JSON.stringify({
        headers: {
          Authorization: "Bearer " + data.data.access_token,
        },
      });
      localStorage.setItem("headers", headers);

      dispatch({
        type: "SET_USER",
        payload: data.data.user,
      });
      return data;
    },
    (error) => {
      console.log(error.response);
      const message = error.response.data.status.message;

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const loginSocial = (name , email,  image) => (dispatch) => {
  return AuthService.loginSocial(name, email , image).then(
    (data) => {

      localStorage.setItem("user_token", data.data.access_token);
      const headers = JSON.stringify({
        headers: {
          Authorization: "Bearer " + data.data.access_token,
        },
      });
      localStorage.setItem("headers", headers);

      dispatch({
        type: "SET_USER",
        payload: data.data.user,
      });
      return data;
    },
    (error) => {
      console.log(error.response);
      const message = error.response.data.status.message;

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const user = () => (dispatch) => {
  return AuthService.user().then((res) => {
    dispatch({
      type: "SET_USER",
      payload: res,
    });
    return res;
  });
};
export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
