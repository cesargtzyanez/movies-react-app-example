import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addFav, removeFav} from "../../redux/actionCreators";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBBtn, MDBCardTitle, MDBNavLink} from "mdbreact";
import {Link, NavLink} from "react-router-dom";
import "./movieItem.scss";

const mapStateToProps = state => {
    return {
        favsList: state.favs
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addToStore: movie => { dispatch(addFav(movie)) },
        removeFromStore: index => { dispatch(removeFav(index)) }
    }
};

class MovieItem extends Component{
    constructor (props) {
        super(props);

        this.state = {
            buttonText: 'Add To Favs',
            inList: false
        };
        this.updateMsg = this.updateMsg.bind(this);
        this.addToFavs = this.addToFavs.bind(this);
        this.getListIndex = this.getListIndex.bind(this);
        this.getTitle = this.getTitle.bind(this);
    }

    componentDidMount() {
        const msg = this.getListIndex() > -1 ? 'Remove from Favs' : 'Add to Favs';
        this.setState({buttonText: msg});
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('updated: ', this.props);
    }

    updateMsg () {
        const msg = parseInt(this.props.movie.Year) < 2010 ? 'Old movie' : 'New Movie';
        console.log('---', msg);
        this.setState({msg: msg})
    }

    getListIndex () {
        const id = this.props.movie.imdbID;
        return this.props.favsList.findIndex( item => item.imdbID === id );
    }

    addToFavs () {
        const listIndex = this.getListIndex();

        this.setState({inList: listIndex > -1});
        this.setState({inList: !this.state.inList});

        if (listIndex > -1) {
            this.props.removeFromStore(listIndex);
            this.setState({buttonText: 'Add to favs'});
        } else {
            this.props.addToStore(this.props.movie);
            this.setState({buttonText: 'Remove from favs'});
        }
    }

    getTitle () {
        const title = this.props.movie.Title;
        const search = this.props.search.trim() || '';
        const regex = new RegExp(search, 'gi');
        const matches = title.match(regex);
        const parts = title.split(regex);

        const finalTitle = !search.length ? title : parts.reduce((acc,part,index) => {
            acc.push(part);
            acc.push( <span className="search">{matches[index]}</span> );
            return acc;
        }, []);

        return ( <MDBCardTitle>{finalTitle}</MDBCardTitle> );
    }

    render() {
        const {Title, Year, Poster, imdbID} = this.props.movie;
        const link = 'movie/' + imdbID;
        return (
            <MDBCard md="4" style={{ width: "22rem" }} className="movieItem">
                <MDBCardImage className="img-fluid" src={Poster} waves />
                <MDBCardBody>
                    {/*<MDBCardTitle dangerouslySetInnerHTML={this.getTitle()}></MDBCardTitle>*/}
                    {this.getTitle()}
                    <MDBCardText>{Year}</MDBCardText>
                    <MDBBtn href={link}>See detail</MDBBtn>
                    <MDBBtn onClick={this.addToFavs}>{this.state.buttonText}</MDBBtn>
                    {this.props.url != '/favs' && <MDBNavLink to='/favs'>Go to Favs</MDBNavLink>}
                </MDBCardBody>
            </MDBCard>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
