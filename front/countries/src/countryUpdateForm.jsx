import React, { Component } from 'react';


class Update extends Component {

    getCountryToUpdatePlaceholders = () => {
        const { countries } = this.props
        const { id } = this.props.match.params
        return countries.find(c => c._id === id)
    }

    render() {
        let country = this.getCountryToUpdatePlaceholders()
        if (country) return (
            <div>
                < form onSubmit={(e) => this.props.handleUpdate(e, country._id)}>
                    <label> Country Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => this.props.handleChange(e)}
                    />
                    <label> Country Capital</label>


                    <input
                        type="text"
                        name="capital"

                        onChange={(e) => this.props.handleChange(e)}
                    />

                    <label> Country Currency</label>

                    <input type="text"
                        name="currency"

                        onChange={(e) => this.props.handleChange(e)}
                    />

                    <button>
                        Submit
                     </button>
                </form >
            </div>

        );

        if (!country) return (
            <p>Sorry Nothing To Display</p>
        )
    }
}

export default Update;