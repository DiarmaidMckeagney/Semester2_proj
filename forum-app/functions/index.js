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
const {getAuth} = require("firebase-admin/auth");
const {error} = require("firebase-functions/logger");
admin.initializeApp();

exports.userInfo = functions.https.onRequest((request, response) => {

    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        let myData = [];
        admin.firestore().collection("Profiles").doc(request.body.data.Uid).get().then((doc) => {
            if (!doc.exists) {
                console.log('No matching documents.');
                response.send({data : 'No data in database'});
                return;
            }
            else{
                myData.push(doc.data());
            };
            response.send({data : myData});
        });
    });
});

exports.createProfile = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request,response, () => {
        return admin.firestore().collection("Profiles").doc(request.body.data.Uid).set({ username: request.body.data.username, dob: request.body.data.dob, age: request.body.data.age}).then(() => {
            response.send({
                status: "success",
                data: null
            });
        });
    });
 });

exports.chatroomMessages = functions.https.onRequest( (request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        let myData = [];
        admin.firestore().collection("chatrooms/"+ request.body.data.name + "/posts").orderBy("timestamp",
            "asc").get().then((snapshot) => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send({data : 'No data in database'});
                return;
            }
            snapshot.forEach(doc => {
                myData.push(doc.data());
            });
            response.send({data : myData});
        });
    });
});

exports.chatroomNames = functions.https.onRequest((request, response) => {
   request.header("Access-Control-Allow-Origin: *");
   cors(request,response, () => {
       let myData = [];
       admin.firestore().collection("chatrooms").get().then((snapshot) => {
           if (snapshot.empty) {
               console.log('No matching documents.');
               response.send({data : 'No data in database'});
               return;
           }
           snapshot.forEach(doc => {
               myData.push(doc.id);
           });
           response.send({data : myData});
       });
   });
});


exports.communityPosts = functions.https.onRequest( (request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        let myData = [];
        admin.firestore().collection("communities/"+ request.body.data.name + "/posts").orderBy("timestamp",
            "asc").get().then((snapshot) => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send({data : 'No data in database'});
                return;
            }
            snapshot.forEach(doc => {
                myData.push(doc.data());
            });
            response.send({data : myData});
        });
    });
});

exports.newChatroom = functions.https.onRequest((request, response) => {
   request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        const chatRoomDocRef = admin.firestore().collection("chatrooms").doc(request.body.data.name).set({isPublic: true});
        return admin.firestore().collection("chatrooms").doc(request.body.data.name).collection("posts").add({"username": "Alumn", "timestamp": currentTime, "message": "Welcome to your new chatroom!"}).then(() => {
            response.send({
                status: "success",
                data: null
            });
        });
    });
});

exports.newMessage = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        return admin.firestore().collection('chatrooms').doc(request.body.data.name).collection("posts").add({"username": request.body.data.username, "timestamp": currentTime, "message": request.body.data.message}).then((
        )=>{
            response.send({
                status: "success",
                data: null
            });
        });
    });
});

exports.newFriend = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        const FriendDocRef = admin.firestore().collection('Friends').doc(request.body.data.userId).collection("FriendsList").doc(request.body.data.friendId).set({randVar: true});
        return admin.firestore().collection("Friends").doc(request.body.data.userId).collection("FriendsList").doc(request.body.data.friendId).collection("Posts").add({name: "Alumn", timestamp: currentTime, message: "Start chatting with this friend!"}).then(() => {
            response.send({
                status: "success",
                data: null
            });
        });
    });
});

exports.displayFriendMessages = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        let myData = [];
        let docRef = admin.firestore().collection("Friends/" + request.body.data.userId + "/FriendsList/"+ request.body.data.friendId + "/posts").orderBy("timestamp", "asc");
        docRef.get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send({data : 'No data in database'});
                return;
            }
            snapshot.forEach(doc => {
                myData.push(doc.data());
            });
            response.send({data : myData});
        });
    });
});


exports.communityNames = functions.https.onRequest((request, response) => {
   request.header("Access-Control-Allow-Origin: *");
   cors(request,response, () => {
       let myData = [];
       admin.firestore().collection("communities").get().then((snapshot) => {
           if (snapshot.empty) {
               console.log('No matching documents.');
               response.send({data : 'No data in database'});
               return;
           }
           snapshot.forEach(doc => {
               myData.push(doc.id);
               console.log(doc.id);
           });
           response.send({data : myData});
       });
   });
});

exports.newCommunity = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request,response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        const communityDocRef = admin.firestore().collection("communities").doc(request.body.data.name).set({isPublic: true});
        return admin.firestore().collection("communities").doc(request.body.data.name).collection("posts").add({"username": "Alumn",
    "timestamp": currentTime, "content": "Welcome to your new community!"}).then(() => {
            response.send({
                status: "success",
                data: null
            })
        });
    });
 });

 exports.newPost = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request,response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        const communityDocRef = admin.firestore().collection("communities").doc(request.body.data.name);
        return admin.firestore().collection("communities").doc(request.body.data.name).collection("posts").add({"username": request.body.data.username,
    "timestamp": currentTime, "content": request.body.data.message}).then(() => {

            response.send({
                status: "success",
                data: null
            })
        });
    });
 });

exports.newFriendMessage = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        const friendMessageRef = admin.firestore().collection('Friends/' + request.body.data.friendId + "/FriendsList/" + request.body.data.userId + "/posts").add({"username": request.body.data.username, "timestamp": currentTime, "message": request.body.data.message});
        return admin.firestore().collection('Friends/' + request.body.data.userId + "/FriendsList/" + request.body.data.friendId + "/posts").add({"username": request.body.data.username, "timestamp": currentTime, "message": request.body.data.message}).then((
        )=>{
            response.send({
                status: "success",
                data: null
            });
        });
    });
});


exports.displayFriends = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        let myData = [];
        admin.firestore().collection("Friends/" + request.body.data.userId +"/FriendsList").get().then((snapshot) => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send({data : 'No data in database'});
                return;
            }
            snapshot.forEach(doc => {
                
                    myData.push({id: doc.id, name: doc.data()});
            });
            response.send({data : myData});
        });
    });
});

exports.startFriendList = functions.https.onRequest((request, response) => {
    request.header("Access-Control-Allow-Origin: *");
    cors(request, response, () => {
        admin.firestore().collection("Friends").doc(request.body.data.userId).set({numFriends: 0}).then(() => {
            admin.firestore().collection("Friends/" + request.body.data.userId + "/FriendsList").doc("No_Friends").set({randVar: true}).then(() => {
                response.send({
                    status: "success",
                    data: null
                });
            });
        });
    });
});

