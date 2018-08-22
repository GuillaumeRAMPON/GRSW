

//Import the mongoose module
var mongoose = require('mongoose');

var PortfolioItemSchema = new mongoose.Schema({
    libelle: String,
    code: String,
    qty: Number,
    cours: Number,
    valeurJanvier: Number,
    achat: Number,
    vente: Number,
    dividendes: Number,
    classe: String,
    secteur: String,
    geographie: String
});


var PortfolioSchema = new mongoose.Schema({
    nom: String,
    priceJan : Number,
    lastPerfEur : Number,
  items: [PortfolioItemSchema]
});

/*var PortfolioHistWSchema = new mongoose.Schema({
    nom: String,
    monday: Date,
    valo: Number,
    perfeur: Number,
    price: Number
});

var PortfolioHistW = mongoose.model('PortfolioHistW', PortfolioHistWSchema, 'portfolio_histw');

var Portfolio = mongoose.model('Porfolio', PortfolioSchema, 'portfolio');
*/

//module.exports = PortfolioItemSchema;
//module.exports = PortfolioSchema;
module.exports = Portfolio = mongoose.model('Porfolio', PortfolioSchema, 'portfolio');

//module.exports = {PortfolioHistW:PortfolioHistW,Porfolio:Portfolio}





