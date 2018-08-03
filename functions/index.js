const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// END EXAMPLE



exports.onUserStatusChanged = functions.database
  .ref('/status/{userId}') // Reference to the Firebase RealTime database key
  .onUpdate(event => {
      const usersRef = firestore.collection('/users'); // Create a reference to the Firestore Collection

      return event.data.ref.once('value')
        .then(statusSnapshot => snapShot.val()) // Get the latest value from the Firebase Realtime database
        .then(status => {
            // check if the value is 'offline'
            if (status === 'offline') {
                // Set the Firestore's document's online value to false
                usersRef
                  .doc(event.params.userId)
                  .set({
                      isOnline: false
                  }, { merge: true });
            }
        })
  });