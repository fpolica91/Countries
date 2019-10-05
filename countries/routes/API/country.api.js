const mongoose = require('mongoose')
const Country = require('../../models/Country')
const express = require('express')
const router = express.Router()


router.get('/countries', (req, res, next) => {
    Country.find({})
        .then(data => res.json(data))
        .catch(err => console.log(error))
})

router.post('/newCountry', (req, res, next) => {
    Country.create({
        name: req.body.name,
        capital: req.body.capital,
        currency: req.body.currency
    })
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.delete('/deleteCountry/:id', (req, res, next) => {
    Country.findByIdAndDelete(req.params.id)
        .then(country => console.log(`deleted ${country.name}`))
        .catch(err => console.log(err))
})




module.exports = router