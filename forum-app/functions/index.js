/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp();

exports.userInfo = functions.https.onRequest((request, response) => {

    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        let myData = [];
        const docRef = admin.firestore().collection("Profiles").where("Uid", "==", request.body.data.Uid);
        return docRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                myData.push(doc.data());
            });
            response.send({data : myData});
        }).catch((error) => {
                console.log("Error getting documents: ", error);
        });
    });
});

exports.createProfile = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        return admin.firestore().collection("Profiles").add(request.body).then(() => {
            response.send("Saved in the database");
        });
    });
});
