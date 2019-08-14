import axios from 'axios';
// ACTION TYPES;
const FETCH_USERS = "FETCH_USERS";
const ADD_USER = "ADD_USER";
const LOGGED_USER = "LOGGED_USER";
const UPDATE_USER = "UPDATE_USER";
const ADD_FRIEND = "ADD_FRIEND";

// ACTION CREATOR;
const fetchUsers = (users) => {
    return {
        type: FETCH_USERS,
        payload: users
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

// REDUCER FUNCTION;
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_USERS:
            return action.payload;
        default:
            return state;
    }
}