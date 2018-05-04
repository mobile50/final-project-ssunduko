import { createStore, applyMiddleware, combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

import { AppNavigator } from './AppNavigator';


//
// Initial State...
//

const initialReviewState = {
    review: 'This is a default review'
};

//
// Reducer...
//
const review = (state = initialReviewState, action) => {
    console.log("Review Reducer, action: ");
    console.log(action);
    switch(action.type) {

        case "setBookReview":
            return { ...state, review: action.value };

        default:
            return state;
    }
};

// Start with two routes: Search, MyBooks.
const Search = AppNavigator.router.getActionForPathAndParams('Search');
const MyBooks = AppNavigator.router.getActionForPathAndParams('MyBooks');
const initialNavState = AppNavigator.router.getStateForAction(
    Search
);


const nav = (state = initialNavState, action) => {
    let nextState;
    console.log("Navigation Reducer, action: ");
    console.log(action);
    switch (action.type) {
        case 'Search':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Search' }),
                state
            );
            break;
        case 'MyBooks':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'MyBooks' }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

const AppReducer = combineReducers({
    nav,
    review,
});


//
// Store...
//
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("root");
export function configureStore() {
    return createStore(AppReducer,applyMiddleware(middleware));
}

//
// Action Creators...
//


const setBookReview = (review) => {
    return {
        type: "setBookReview",
        value: review
    };
};

export { setBookReview, addListener };