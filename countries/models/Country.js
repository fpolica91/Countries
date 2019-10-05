const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    capital: {
        type: String,
        required: true
    },
    currency: {
        type: String
    }

})

const Country = mongoose.model("Country", countrySchema)

module.exports = Country