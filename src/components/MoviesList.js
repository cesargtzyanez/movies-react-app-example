import React, {Component} from 'react';
import {MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import API from "../utils/API";
import ItemsList from "./ItemsList";

class MoviesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            response: true
        };

        // this.createItems = this.createItems.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.errorMessage = this.errorMessage.bind(this);
    }

    componentDidMount() {
        this.fetchData('Batman');
    }

    fetchData (title) {

        API.getMovies(title)
            .then(resp => {
                if (resp.Response === "True") {
                    this.setState( {list: resp.Search, response: true} );
                } else {
                    this.setState( {list: [], response: false} );
                }
            });
    }

    inputHandler (evt) {
        const title = evt.target.value;

        if (title.length >= 3) {
            this.fetchData(title);
        } else {
            this.setState({list: [], response: false});
        }
    }

    // Esto ya se hizo en un componente --> ItemsList
    /*createItems () {
        return this.state.list.map( movie => <MovieItem key={movie.imdbID} movie={movie} /> );
    };*/

    errorMessage () {
        return this.state.response === false ? <h2>Sorry, we have an error!</h2> : '';
    }

    render() {
        return (
            <MDBContainer>
                <h1>Search for a movie!</h1>
                {this.errorMessage()}
                <MDBRow md="12" lg="12">
                    <div className="input-group md-form form-sm form-1 pl-0">
                        <div className="input-group-prepend">
                          <span className="input-group-text blue lighten-3" id="basic-text1">
                            <MDBIcon className="text-white" icon="search" />
                          </span>
                        </div>
                        <input onChange={this.inputHandler} className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                </MDBRow>
                <MDBRow>
                    <ItemsList items={this.state.list}/>
                </MDBRow>
            </MDBContainer>)
    }
}

export default MoviesList;
