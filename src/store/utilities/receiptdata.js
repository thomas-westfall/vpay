import axios from 'axios';
// ACTION TYPES;
const FETCH_RECEIPT_DATA = "FETCH_RECEIPT_DATA";

// ACTION CREATOR;
const fetchReceiptData = (receiptdata) => {
    return {
        type: FETCH_RECEIPT_DATA,
        payload: receiptdata
    }
}

// Thunks go here!
export const fetchReceiptDataThunk = (selectedFile) => (dispatch) => {
    const data = new FormData() 
    data.append('file', selectedFile)

    axios.post("https://api.taggun.io/api/receipt/v1/verbose/file", data, { // receive two parameter endpoint url ,form data 
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "apikey": "e6d1b110bdf511e98bfadfb7eb1aa8b5"
      }
    })
  .then(res => { // then print response status
    dispatch(fetchReceiptData(res.data));
    console.log(res.data);
  })
}

// REDUCER FUNCTION;
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_RECEIPT_DATA:
            return action.payload;
        default:
            return state;
    }
}