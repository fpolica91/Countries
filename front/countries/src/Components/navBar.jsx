import React, { Component } from 'react';
import { Link } from "react-router-dom"

class NavBar extends Component {

    render() {
        return (
            <React.Fragment>
                <Link to="/create">Create Country</Link>

            </React.Fragment>
        );
    }
}

export default NavBar;