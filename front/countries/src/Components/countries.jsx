import React, { Component } from 'react'

import { Link } from "react-router-dom"

class Countries extends Component {

    render() {
        return (

            < div >
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <div className="card-text">
                            <p>{this.props.capital}</p>
                            <p>{this.props.currency}</p>
                            <button className="btn btn-sm btn-danger" onClick={() => this.props.deleteCountry(this.props._id)}>
                                Delete
                            </button>
                            <Link to={`/item/${this.props._id}`}>Country Info</Link>

                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

export default Countries;