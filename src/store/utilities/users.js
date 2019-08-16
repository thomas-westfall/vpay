import axios from 'axios';
// ACTION TYPES;
const FETCH_USERS = "FETCH_USERS";
const ADD_USER = "ADD_USER";
const LOGGED_USER = "LOGGED_USER";
const UPDATE_USER = "UPDATE_USER";
const ADD_FRIEND = "ADD_FRIEND";
const REGISTER_USER = "REGISTER_USER";
const REGISTER_ERROR = "REGISTER_ERROR";

// ACTION CREATOR;
const fetchUsers = (users) => {
    return {
        type: FETCH_USERS,
        payload: users
    }
}

const registerError = (err) => {
    return {
        type: REGISTER_ERROR,
        payload: err
    }
}
const registerUser = (user) => {
    return {
        type: REGISTER_USER,
        payload: user
    }
}
// const editUser = (user) => {
//     return {
//         type: EDIT_USER,
//         payload: user
//     }
// }

// const addUser = (user) => {
//     return {
//         type: ADD_USER,
//         payload: user
//     }
// }

// const loggedUser = (user) => {
//     return {
//         type: LOGGED_USER,
//         payload: user
//     }
// }

// Thunks go here!
export const fetchUsersThunk = () => (dispatch) => {
    const arrayOfUsers = [
        {
            "id": 1,
            "username": "user1",
            "password": "password1",
            "email": "user1@email"
        },
        {
            "id": 2,
            "username": "user2",
            "password": "password2",
            "email": "user2@email"
        },
        {
            "id": 3,
            "username": "user3",
            "password": "password3",
            "email": "user3@email"
        }
    ]
}
export const registerUserThunk = (user) => async (dispatch) => {
    await axios.post(`https://vpay-heroku.herokuapp.com/api/users/`, {
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        password : user.password,
        phoneNumber : user.phoneNumber,
        email : user.email
    })
    .then(res => {
        console.log(res);
        dispatch(registerUser({success : "User Successfully Registered!"}));
    })
    .catch(err => {
        console.log(err.response)
        dispatch(registerError(err));
        
    })
}


// REDUCER FUNCTION;
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload;
        case REGISTER_USER:
            return action.payload;
        case REGISTER_ERROR:
            return action.payload;
        default:
            return state;
    }
}