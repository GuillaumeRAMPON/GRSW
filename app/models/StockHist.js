//Import the mongoose module
var mongoose = require('mongoose');

var StockHistSchema = new mongoose.Schema({
    closedate: String,
    closevalue: Number
});


var StockSchema = new mongoose.Schema({
    libelle: String,
    code: String,
  histd: [StockHistSchema],
  histw: [StockHistSchema],
  histm: [StockHistSchema]
});

module.exports = StockHist = mongoose.model('StockHist', StockSchema, 'stockhist');