import React, { Component } from 'react';
import { Link } from "react-router-dom"
import SearchBar from './searchbar';

class NavBar extends Component {

    render() {
        return (
            <React.Fragment >
                <Link to="/create">Create Country</Link>
                <SearchBar
                    handleSearch={this.props.handleSearch}
                    query={this.props.query}
                />

            </React.Fragment >
        );
    }
}

export default NavBar;