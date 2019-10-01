import axios from 'axios';
// ACTION TYPES;
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const ERROR = "ERROR";

// ACTION CREATOR;
const logIn = (user) => {
    return {
        type: LOG_IN,
        payload: user
    }
}
const logOut = () => {
    return {
        type: LOG_OUT,
    }
}

const error = (err) => {
    return {
        type: ERROR,
        payload: err
    }
}
// Thunks go here!
export const logInThunk = (user) => async (dispatch) => {
    let res;
    try {
        console.log(user);
        res = await axios.post(` https://cors-anywhere.herokuapp.com/https://vpay-backend-auth.herokuapp.com/auth/login`, {
            "username": user.username,
            "password": user.password
        }, { withCredentials: false })
    }
    catch (authError) {
        return dispatch(error(authError));
    }

    try {
        console.log(res.data, "THIS IS OUR INITIAL DATA");
        dispatch(logIn(res.data));
    }
    catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr)
    }
}

export const me = () => async dispatch => {
    try {
        console.log('auth')
        const res = await axios.get(` https://cors-anywhere.herokuapp.com/https://vpay-backend-auth.herokuapp.com/auth/me`, { withCredentials: false });
        dispatch(logIn(res.data || {}));
    }
    catch (err) {
        console.error(err);
    }
}
export const logOutThunk = () => async (dispatch) => {
    try {

        await axios.delete(' https://cors-anywhere.herokuapp.com/https://vpay-backend-auth.herokuapp.com/auth/logout', { withCredentials: false });
        dispatch(logOut());
    }
    catch (err) {
        console.error(err);
    }
}

// REDUCER FUNCTION;
export default (state = {}, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
        case LOG_OUT:
            return {};
        case ERROR:
            return action.payload;
        default:
            return state;
    }
}