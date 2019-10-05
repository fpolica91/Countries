import React, { Component } from 'react';


class Form extends Component {

    render() {

        return (
            < form onSubmit={(e) => this.props.handleSubmit(e)} >
                <label> Country Name</label>
                <input
                    onChange={(e) => this.props.handleChange(e)}
                    type="text" name="name" value={this.props.country.name} />
                <label> Country Capital</label>
                <input
                    onChange={(e) => this.props.handleChange(e)}
                    type="text" name="capital" value={this.props.country.capital} />
                <label> Country Currency</label>
                <input
                    onChange={(e) => this.props.handleChange(e)}
                    type="text" name="currency" value={this.props.country.currency} />
                <button>Submit</button>
            </form >
        );
    }
}

export default Form;