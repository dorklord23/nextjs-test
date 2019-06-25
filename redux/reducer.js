import { createStore } from 'redux';

const defaultState = {
    cityName: '',
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_CITY_NAME':
            return { ...state, cityName: action.payload };
        default:
            return state
    }
};

const makeStore = (initialState) => {
    return createStore(reducer, initialState);
};

export default makeStore;
