import React, { Component } from 'react';

class SearchBar extends Component {

    render() {
        return (
            <div>
                <input
                    value={this.props.query}
                    onChange={e => this.props.handleSearch(e.currentTarget.value)}
                    name="query" />
            </div>
        );
    }
}

export default SearchBar;