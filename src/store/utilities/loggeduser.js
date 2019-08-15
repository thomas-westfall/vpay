import axios from 'axios';
// ACTION TYPES;
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

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

// Thunks go here!
export const logInThunk = (user) => (dispatch) => {
    // axios.get(`GOING TO BACKEND TO SEARCH FOR THIS USER THROUGH ${user.username}&&${user.password}`)
    // .then(res => {
    //   if(res.data){
    //     console.log(res)
    //     dispatch(fetchCampuses(res.data));
    //   }
    //   else{
    //     dispatch(logIn()); // IF USER DOES NOT EXIST, FIGURE OUT WHAT TO DO:
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // })
    dispatch(logIn(user));
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
        default:
            return state;
    }
}