const admin = require('firebase-admin');
const firebase = require('firebase');
const serviceAccount = require('./util/accountKey.json');

//FireStore Setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://orderapp-264eb.firebaseio.com"
});

//to access db
var db = admin.firestore();
//to enable timestamp in firebase
const settings = {
  timestampsInSnapshots: true
};

db.settings(settings);

module.exports = {
  db,
  firebase,
  admin
};