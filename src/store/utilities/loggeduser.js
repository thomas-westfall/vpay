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
        payload: {}
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

    await axios.put(`https://vpay-heroku.herokuapp.com/api/users/login`, {
        username : user.username,
        password : user.password
    })
    .then(res => {
        console.log(res);
        dispatch(logIn(res.data));
    })
    .catch(err => {
        console.log(err.response,"SOWEKNOW")
        dispatch(error(err));
        
    })
    // dispatch(logIn(user));
}
export const logOutThunk = () => (dispatch) => {
    dispatch(logOut());
}

// REDUCER FUNCTION;
export default (state = {}, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
        case LOG_OUT:
            return action.payload;
        case ERROR:
            return action.payload;
        default:
            return state;
    }
}