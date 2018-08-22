

//Import the mongoose module
var mongoose = require('mongoose');

var PortfolioHistWSchema = new mongoose.Schema({
    nom: String,
    monday: Date,
    valo: Number,
    perfeur: Number,
    price: Number
});

module.exports = PortfolioHistW = mongoose.model('PortfolioHistW', PortfolioHistWSchema, 'portfolio_histw');





