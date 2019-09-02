import {ADD_FAV, REMOVE_FAV} from "./actionTypes";

const initialState = {
    favs: []
};

const reducer = (state = initialState, action) => {
    console.log('Reducer state: ', state);
    console.log('Reducer action: ', action);

    const {type, payload} = action;

    let favsUpdated = state.favs;

    switch (type) {
        case ADD_FAV:
            favsUpdated.push(payload);
            //favsUpdated = [...state.favs, payload];
            return {...state, favs: favsUpdated};

        case REMOVE_FAV:
            favsUpdated.splice(payload, 1);
            return {...state, favs: favsUpdated};

        default:
            return state;
    }
};

export default reducer;
