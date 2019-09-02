import axios from 'axios';

const KEY = 'a4a947a3';
const baseURL = 'http://www.omdbapi.com/?apikey=' + KEY;

const API = {
    getMovies: async title => {
        const url = baseURL + '&s=' + title;
        let data = null;

        await axios.get(url)
            .then(resp => {
                data = resp.data;
            });

        return data;
    },

    getFullMovie: async id => {
        const url = baseURL + '&plot=full&i=' + id;
        let data = null;

        await axios.get(url)
            .then(resp => {
                data = resp.data;
            });

        return data;
    }
};


export default API;