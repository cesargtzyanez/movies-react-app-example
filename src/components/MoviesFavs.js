import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import ItemsList from "./ItemsList";

const mapStateToProps = state => {
  return {
      favsList: state.favs,
      totalFavs: state.favs.length
  }
};

class MoviesFavs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            search: ''
        };

        // this.createItems = this.createItems.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }

    componentDidMount() {
        this.setState({list: this.props.favsList});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('UPDATE', this.props);
    }


    inputHandler (evt) {
        const search = evt.target.value.toLowerCase();
        const filteredFavs = this.props.favsList.filter( fav => fav.Title.toLowerCase().includes(search) );
        this.setState({list: filteredFavs, search: search});
    }

    /*createItems () {
        // return this.state.list.map( movie => <MovieItem key={movie.imdbID} movie={movie} /> );
        return this.props.favsList.map( movie => <MovieItem url={this.props.location.pathname} key={movie.imdbID} movie={movie} /> );
    };*/

    render() {
        return (
            <MDBContainer>
                <h1>Here are your {this.props.totalFavs} favs!</h1>
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
                    <ItemsList search={this.state.search} url={this.props.location.pathname} items={this.state.list}/>
                </MDBRow>
            </MDBContainer>)
    }
}

export default connect(mapStateToProps)(MoviesFavs);
