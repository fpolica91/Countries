import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Form from "./Components/Form"
import axios from "axios"
import NavBar from './Components/navBar';
import Countries from './Components/countries';
import Information from './Components/updateCountry';
import Update from './countryUpdateForm';



class App extends Component {
  state = {
    name: "",
    capital: "",
    currency: "",
    countries: [],
    clone: [],
    formSubmitted: false,
    query: ""
  }

  async  componentDidMount() {
    await this.getCountries()

  }
  // HANDLES THE INPUTS FOR CREATING NEW COUNTRY
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  };

  // ------THIS HANDLES SUBMMITTING THE NEW COUNTRY CREATED--///
  handleSubmit = async (e) => {
    e.preventDefault()
    const country = {
      name: this.state.name,
      capital: this.state.capital,
      currency: this.state.currency
    }

    // ----THS IS USED TO UPDATE THE STATE--//
    const list = [...this.state.countries]
    list.push(country)

    await axios.post("http://localhost:3001/newCountry", country)

    this.setState({
      // HERE WE USE LIST//
      countries: list,
      name: "",
      capital: "",
      currency: ""
    })

  }

  //GETS COUNTRIES FROM DB
  getCountries = async () => {
    await axios.get("http://localhost:3001/countries")
      .then(country => {
        this.setState({
          countries: country.data,
          clone: country.data
        })
      })
  }

  renderCountries = () => {
    const countries = [...this.state.countries]
    return countries.map(country => {
      return <Countries key={country._id}  {...country} deleteCountry={this.deleteCountry} />
    })
  }

  deleteCountry = (id) => {
    const clone = [...this.state.countries]
    let country = clone.findIndex(c => c._id === id)
    clone.splice(country, 1)
    this.setState({
      countries: clone
    })
    axios.delete(`http://localhost:3001/deleteCountry/${id}`)
  }

  updateCountry = async (e, id) => {
    e.preventDefault()
    const body = {
      name: this.state.name,
      capital: this.state.capital,
      currency: this.state.currency
    }

    let list = [...this.state.countries]
    let countryToUpdate = list.findIndex(c => c._id === id)
    list.splice(countryToUpdate, 1)

    list.push(body)
    await axios.put(`http://localhost:3001/update/${id}`, body)


    this.setState({
      countries: list,
      name: "",
      capital: "",
      currency: ""
    })
  }

  searchCountry = (query) => {
    const { clone } = this.state
    const list = clone.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))

    this.setState({
      query: query,
      countries: list
    })
  }

  render() {
    return (
      < div >
        <NavBar
          handleSearch={this.searchCountry}
          query={this.state.query}
        />
        {/* function that renders countries */}
        {this.renderCountries()}
        <Switch>

          <Route path={'/create'} render={(props) =>
            <Form
              {...props} country={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />} />

          <Route path="/item/:id"
            render={(props) => <Information {...props} countries={this.state.countries} />
            } />

          <Route
            path="/update/:id"
            render={(props) =>
              <Update
                {...props} countries={this.state.countries}
                handleChange={this.handleChange}
                handleUpdate={this.updateCountry}
              />
            } />


        </Switch>
      </div >
    );
  }
}

export default App;
