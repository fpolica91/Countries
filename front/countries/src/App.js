import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Form from "./Components/Form"
import axios from "axios"
import NavBar from './Components/navBar';
import Countries from './Components/countries';



class App extends Component {
  state = {
    name: "",
    capital: "",
    currency: "",
    countries: [],
    clone: []
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
  }

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
    return axios.get("http://localhost:3001/countries")
      .then(country => {
        this.setState({
          countries: country.data
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



  render() {
    return (
      < div >
        <NavBar />
        {/* function that renders countries */}
        {this.renderCountries()}
        <Switch>
          <Route path={'/create'} render={(props) => <Form  {...props} country={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />} />
        </Switch>
      </div >
    );
  }
}

export default App
