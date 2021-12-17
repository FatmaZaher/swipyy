import Axios from "axios";

import {
    USER_SIGNIN_REQUIST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_REGISTER_REQUIST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
} from "../types";

const logout = () => (dispatch) => {

};

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUIST, payload: { email, password } });
    try {
        const { data } = await Axios.post("https://swipyy.xyz/api/login", { email, password }).then((res) => {
            localStorage.setItem("user_token", res.data.token);
        })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
};

const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUIST, payload: { name, email, password } });
    try {
        const { data } = await Axios.post("https://swipyy.xyz/api/register", {
            name,
            email,
            password,
        }).then((res) => {
            localStorage.setItem("user_token", res.data.api_token);
        });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
};
export { signin, register, logout };