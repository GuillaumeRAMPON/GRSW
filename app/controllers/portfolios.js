

//Import the mongoose module
var mongoose = require('mongoose');

//var {Porfolio,PortfolioHistW} = require('./Portfolio.js');
var Porfolio = require('../models/Portfolio.js');
var PorfolioHistW = require('../models/Portfolio_histw.js');
var Stock = require('./stock.js');

module.exports.getlist = function (id, callback) {
  Porfolio.find({ 'nom': id }, function (err, result) {
    if (err) return next(err);
    if (result.length >0)
    {
    foliolist = result[0].items;
    callback(null, foliolist)
    }
    else{console.log("aucun résultat pour " + id)}
  });
};

module.exports.maj = function (id) {
  Porfolio.find({ 'nom': id }, function (err, result) {
    var counter = result[0].items.length; //For synchronous end action
    result[0].items.forEach(function (obj) {
      if (obj.code != "") {
        Stock.getLastValue(obj.code, function (err, lastValue) {
          obj.cours = lastValue;
          //console.log(result[0].items);
          counter -= 1;
          if (counter == 0) {
            //console.log("ALL DONE");
            //Portfolio.update({ 'nom': id }, result[0], function (err, raw) {
            Portfolio.update({ 'nom': portfolio, 'items.code': obj.code }, { 'items.$.cours': obj.cours }, function (err, raw) {
              if (err) {
                console.log(err);
              }
            });
          }
        })
        return obj;
      }
      else {
        counter -= 1;
      }
    });
  });
}

module.exports.updatevalue = function (portfolio, ticker, value) {

  Porfolio.find({ 'nom': portfolio }, function (err, result) {

    result[0].items.forEach(function (obj) {
      if (obj.code == ticker) {
        obj.cours = value;

        //console.log("ALL DONE");
        //Portfolio.update({ 'nom': portfolio }, result[0], function (err, raw) {
        Portfolio.update({ 'nom': portfolio, 'items.code': obj.code }, { 'items.$.cours': obj.cours }, function (err, raw) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });


}

module.exports.saveHisto = function (phisto) {

  Porfolio.find({ 'nom': phisto.nom }, function (err, result) {
    if (err) {
      console.log(err);
    }
    newPerfEur = phisto.perfeur;
//console.log("TOTOTA"+phisto.nom+result.nom);
    phisto.perfeur = phisto.perfeur - result[0].lastPerfEur;
    phisto.price = (1+phisto.price/100) * result[0].priceJan;

    Portfolio.update({ 'nom': phisto.nom }, { 'lastPerfEur': newPerfEur }, function (err, raw) {
      if (err) {
        console.log(err);
      }
    });
    //console.log("TATATA"+result.lastPerfEur);
    histo = new PorfolioHistW(phisto);
    histo.save();
  });
}

module.exports.getsumc = function (id, callback) {

  Porfolio.aggregate(
    [
      { $unwind: "$items" },
      { $match: { "nom": id } },
      {
        $group: {
          _id: '$items.classe',
          amount: { $sum: { $multiply: ["$items.qty", "$items.cours"] } }
        }
      }
    ]
    , function (err, result) {
      if (err) return next(err);
      callback(null, result)
    });
};

module.exports.getsums = function (id, callback) {

  Porfolio.aggregate(
    [
      { $unwind: "$items" },
      { $match: { "nom": id } },
      {
        $group: {
          _id: '$items.secteur',
          amount: { $sum: { $multiply: ["$items.qty", "$items.cours"] } }
        }
      }
    ]
    , function (err, result) {
      if (err) return next(err);
      callback(null, result)
    });
};

module.exports.getsumg = function (id, callback) {

  Porfolio.aggregate(
    [
      { $unwind: "$items" },
      { $match: { "nom": id } },
      {
        $group: {
          _id: '$items.geographie',
          amount: { $sum: { $multiply: ["$items.qty", "$items.cours"] } }
        }
      }
    ]
    , function (err, result) {
      if (err) return next(err);
      callback(null, result)
    });
};

module.exports.gethistw = function (id, callback) {

  PortfolioHistW.find({ 'nom': id }, function (err, result) {
    if (err) return next(err);
    callback(null, result)
  });

};