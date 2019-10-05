import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Information extends Component {

    getCountryInfo = () => {
        const { countries } = this.props
        const { id } = this.props.match.params
        let country = countries.find(c => c._id === id)
        return country
    }
    renderCountries = () => {
        let country = this.getCountryInfo()
        if (country) return (
            <div>
                <h5>{country.name}</h5>
                <p>{country.capital}</p>
                <p>{country.currency}</p>
                <Link
                    to={`/update/${country._id}`}
                    className="btn btn-warning">
                    Update Info
                </Link>
            </div>
        )
    }

    render() {

        return (
            <div>
                {this.renderCountries()}
            </div>
        );
    }
}

export default Information;