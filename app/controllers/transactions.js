//Import the mongoose module
var mongoose = require('mongoose');

var Transaction = require('../models/Transaction.model.js');
var Porfolio = require('../models/Portfolio.js');

module.exports.add = function (ptransaction) {
    transaction = new Transaction(ptransaction);
    transaction.save();

    Porfolio.find({ 'nom': ptransaction.portfolio }, function (err, result) {

        result[0].items.forEach(function (obj) {
            if (obj.code == ptransaction.ticker) {
                if (ptransaction.type == "Achat")
                {
                    obj.qty += ptransaction.quantity;
                    obj.achat += ptransaction.amount;
                }
                if (ptransaction.type == "Vente")
                {
                    obj.qty -= ptransaction.quantity;
                    obj.vente += ptransaction.amount;
                }
                if (ptransaction.type == "Dividende")
                {
                    obj.dividendes += ptransaction.amount;
                }

                //console.log("ALL DONE");
                //Portfolio.update({ 'nom': ptransaction.portfolio }, result[0], function (err, raw) {
                Portfolio.update({ 'nom': ptransaction.portfolio, 'items.code':obj.code }, 
                {'items.$.qty':obj.qty,'items.$.achat':obj.achat,'items.$.vente':obj.vente,'items.$.dividendes':obj.dividendes}, 
                function (err, raw) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    });


}

module.exports.list = function (portfolio, ticker, callback) {
    //console.log(portfolio+ticker);
    Transaction.find({ 'portfolio': portfolio, 'ticker': ticker }, function (err, result) {
        if (err) return next(err);
        //console.log(result);
        callback(null, result)
    });

}