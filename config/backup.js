// config/db.js
/*module.exports = {
    url : 'mongodb://localhost/stencil-dev'
}
*/

console.log("Db JS exec");
//Database connection
var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

/*mongoose.connect('mongodb://localhost:27017/stockview');
// .then(() =>  console.log('connection successful'))
// .catch((err) => console.error(err));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongo connected')
    // we're connected!
});*/
mongoose.connect('mongodb://localhostyg:27017/stockview', function(err) {
  //if (err) { throw err; }
  if (err) { console.log('ERR'); }
  console.log(mongoose.connection.readyState);
  mongoose.connection.close();
});
console.log(mongoose.connection.readyState); //Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting


console.log('LA APRES');
//Création des schémas
var PortfolioItem = new mongoose.Schema({
    libelle: String,
    code: String,
    qty: Number,
    cours: Number,
    valeurJanvier: Number,
    achat: Number,
    vente: Number,
    dividendes: Number
});

var Portfolio = new mongoose.Schema({
    nom : String,
    items : [PortfolioItem]
});

console.log('ON AVANCE');

//Création du model
var PortfolioModel = mongoose.model('portfolio', Portfolio);

//Exemple pour créer ajouter en base

/*var monCommentaire = new CommentaireArticleModel({ pseudo : 'Atinux' });
// On rajoute le contenu du commentaire, possible de le faire lors de l'instanciation
monCommentaire.contenu = 'Salut, super article sur Mongoose !';

monCommentaire.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
});
*/

var monport = new PortfolioModel({nom : 'GRN2'});
monport.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
});

//Lecture du portfolio
var query = PortfolioModel.find(null);
query.where('nom', 'GRN');
query.limit(3);
// peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
query.exec(function (err, porfolio) {
  if (err) { 
      console.log('ON Y ERRUER');
      throw err; }
  // On va parcourir le résultat et les afficher joliment
  var comm;
  console.log('ON Y EST');
  for (var i = 0, l = protfolio.length; i < l; i++) {
    comm = comms[i];
    console.log('------------------------------');
    console.log('Pseudo : ' + comm.pseudo);
    console.log('Commentaire : ' + comm.contenu);
    console.log('Date : ' + comm.date);
    console.log('ID : ' + comm._id);
    console.log('-----------------------------');

  }
});

mongoose.connection.close();

mongoose.connect('mongodb://localhost:27017/stockview')
    .then(() => {
        mongoose.connection.on('error', err => {
            console.log('mongoose connection error: '+err);
        });

        console.log('connected - attempting reconnect');
        return mongoose.connect(url);
    })
    .catch(err => {
        console.log('rejected promise: '+err);
        mongoose.disconnect();
    });
;


