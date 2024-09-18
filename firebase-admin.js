var admin = require("firebase-admin");

var serviceAccount = require("./path/to/serviceAccountKey.json"); // Adjust path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shahcoin-default-rtdb.europe-west1.firebasedatabase.app"
});

// Now you can use the Firebase Admin SDK to interact with your database
var db = admin.database();
var ref = db.ref("users");

ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});