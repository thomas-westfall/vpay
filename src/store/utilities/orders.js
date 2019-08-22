// ACTION TYPES;
const FETCH_ORDERS_DATA = "FETCH_ORDERS_DATA";
const RESET_ORDERS_DATA = "RESET_ORDERS_DATA";

// ACTION CREATOR;
const fetchOrdersData = (orders) => {
    return {
        type: FETCH_ORDERS_DATA,
        payload: orders
    }
}

const resetOrdersData = () => {
  return {
    type: RESET_ORDERS_DATA
  }
}

// Thunks go here!
export const fetchOrdersDataThunk = (orders) => async (dispatch) => {
    console.log(orders, "AWOIDHCOIWAHCOIWHC ")
    dispatch(fetchOrdersData(orders));
}

export const resetOrdersDataThunk = () => (dispatch) => {
  let resolvedActionObject = resetOrdersData(); 
  dispatch(resolvedActionObject);
}

// REDUCER FUNCTION;
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ORDERS_DATA:
            return action.payload;
        case RESET_ORDERS_DATA:
            return [];
        default:
            return state;
    }
}