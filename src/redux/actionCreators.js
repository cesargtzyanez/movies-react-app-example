import {ADD_FAV, REMOVE_FAV} from "./actionTypes";

export const addFav = (movie) => {
    return { type: ADD_FAV, payload: movie }
};

export const removeFav = (index) => {
    return {type: REMOVE_FAV, payload: index};
};
