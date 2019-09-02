import React, {Component} from 'react';
import API from "../../utils/API";
import './movieDetail.scss';

class MovieDetail extends Component{
    constructor (props) {
        super(props);
        this.state = {
            movie: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        API.getFullMovie(id)
            .then(movie => {
                this.setState({movie: movie});
            });
    }

    render() {
        const {Title} = this.state.movie;
        return (
            <div className="movieDetail">
                <h1>{Title}</h1>
            </div>
        )
    }
}

export default MovieDetail;
