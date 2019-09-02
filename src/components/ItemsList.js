import React from 'react';
import MovieItem from "./MovieItem/";


function ItemsList(props) {
    const url = props.url || '';
    const search = props.search || '';

    return (
        props.items.map(movie => <MovieItem search={search} url={url} key={movie.imdbID} movie={movie} />)
    )
}

export default ItemsList;
