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
        res = await axios.post(`https://vpay-backend-auth.herokuapp.com/auth/login`, {
            "username": user.username,
            "password": user.password
        }, { withCredentials: true })


    }
    catch (authError) {
        return dispatch(error(authError));
    }

    try {
        // await console.log("LOOK HERE 2");
        // const rek = await axios.get(`https://vpay-backend-auth.herokuapp.com/auth/me`);
        // console.log(rek, "THIS IS WITHIN THE LOGIN, ME CALL");
        // console.log(res.data);
        dispatch(logIn(res.data));
    }
    catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr)
    }
}

export const me = () => async dispatch => {
    try {
        console.log('auth')
        const res = await axios.get(`https://vpay-backend-auth.herokuapp.com/auth/me`, { withCredentials: true });
        dispatch(logIn(res.data || {}));
    }
    catch (err) {
        console.error(err);
    }
}
export const logOutThunk = () => async (dispatch) => {
    try {

        await axios.delete('https://vpay-backend-auth.herokuapp.com/auth/logout', { withCredentials: true });
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