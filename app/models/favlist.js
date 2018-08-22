
module.exports.getlist = function(callback) {
  //console.log("get list");
  
  favlist = [
    {"nom":"Bonduelle","code":"BON.PA"},
    {"nom":"Vilmorin","code":"RIN.PA"}
];
  callback(null, favlist)
  
};

/*
[
    {"nom":"Bonduelle","code":"BON.PA"},
    {"nom":"Vilmorin","code":"RIN.PA"}
]
*/