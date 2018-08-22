

//Import the mongoose module
var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    portfolio: String,
    ticker: String,
    type: String,
    quantity: Number,
    amount: Number,
    date: Date
});

//module.exports = Transaction = mongoose.model('Transaction', Transaction, 'transaction');

// param 1 = Nom de la collection, param 2 = Nom du Schema
var Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;

