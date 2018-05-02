import { createStore} from 'redux';

//
// Initial State...
//

const initialState = {
    bookReview: 'This is a default review'
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case "setBookReview":
            return { ...state, bookReview: action.value };

        default:
            return state;
    }
};

//
// Store...
//

const store = createStore(reducer);
export { store };

//
// Action Creators...
//


const setBookReview = (bookReview) => {
    return {
        type: "setBookReview",
        value: bookReview
    };
};

export { setBookReview };