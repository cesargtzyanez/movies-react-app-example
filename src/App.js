import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import {Provider} from 'react-redux';
import store from "./redux/configureStore";
import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail/";
import MoviesFavs from "./components/MoviesFavs";
import './App.scss';
import './styles/main.scss';

function App() {

    const active = { color: "red" };

    return (
        <Provider store={store}>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" exact activeClassName='menuActivo'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/favs" activeClassName="menuActivo">Favs</NavLink>
                        </li>
                    </ul>
                </nav>
                <Route path='/' exact component={MoviesList}/>
                <Route path='/favs' exact component={MoviesFavs}/>
                <Route path='/movie/:id' component={MovieDetail}/>
            </Router>
        </Provider>
    );
}

export default App;
