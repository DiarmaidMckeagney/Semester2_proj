const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Testing posting to chatrooms', function () {
    this.timeout(100000);
    it('Tests if the db can save posts successfully', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newMessage')
            .set('content-type', 'application/json')
            .send({ data : {name: "Cooking", username: "Diarmaid", message: "Hello world", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(200);
    });
    it('Tests if the db can save posts successfully with no uid', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newMessage')
            .set('content-type', 'application/json')
            .send({ data : {name: "Cooking", username: "Diarmaid", message: "Hello world"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no username', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newMessage')
            .set('content-type', 'application/json')
            .send({ data : {name: "Cooking", message: "Hello world", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no message', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newMessage')
            .set('content-type', 'application/json')
            .send({ data : {name: "Cooking", username: "Diarmaid", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
});

describe("Testing posting to communities", function () {
    this.timeout(100000);
    it('Tests if the db can save posts successfully with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newPost')
            .set('content-type', 'application/json')
            .send({ data : {name: "Biology", username: "Diarmaid", title: "Hello world", mainText: "This is a post", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(200);
    });
    it('Tests if the db can save posts successfully with no community name', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newPost')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", title: "Hello world", mainText: "This is a post", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no username', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newPost')
            .set('content-type', 'application/json')
            .send({ data : {name: "Biology", title: "Hello world", mainText: "This is a post", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no title', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newPost')
            .set('content-type', 'application/json')
            .send({ data : {name: "Biology", username: "Diarmaid", mainText: "This is a post", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no message body', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newPost')
            .set('content-type', 'application/json')
            .send({ data : {name: "Biology", username: "Diarmaid", title: "Hello world", uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no uid', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newPost')
            .set('content-type', 'application/json')
            .send({ data : {name: "Biology", username: "Diarmaid", title: "Hello world", mainText: "This is a post"} } );
        expect(result).status(500);
    });
});

describe("Testing posting to profile", function () {
    this.timeout(100000);
    it('Tests if the db can save posts successfully with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newProfilePost')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", title: "Hello world", messageBody: "This is a post", Uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(200);
    });
    it('Tests if the db can save posts successfully with no username', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newProfilePost')
            .set('content-type', 'application/json')
            .send({ data : {title: "Hello world", messageBody: "This is a post", Uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully no title', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newProfilePost')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", messageBody: "This is a post", Uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully no messageBody', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newProfilePost')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", title: "Hello world", Uid: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no uid', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newProfilePost')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", title: "Hello world", messageBody: "This is a post"} } );
        expect(result).status(500);
    });
});

describe("Testing posting to friends chat", function () {
    this.timeout(100000);
    it('Tests if the db can save posts successfully with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newFriendMessage')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", message: "This is a post", userId: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2", friendId: "4NUTUaQp5jdRnxQekfmWzRmVsA83"} } );
        expect(result).status(200);
    });
    it('Tests if the db can save posts successfully with no friendId', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newFriendMessage')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", message: "This is a post", userId: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no userId', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newFriendMessage')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", message: "This is a post", friendId: "4NUTUaQp5jdRnxQekfmWzRmVsA83"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no message', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newFriendMessage')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmaid", userId: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2", friendId: "4NUTUaQp5jdRnxQekfmWzRmVsA83"} } );
        expect(result).status(500);
    });
    it('Tests if the db can save posts successfully with no username', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newFriendMessage')
            .set('content-type', 'application/json')
            .send({ data : {message: "This is a post", userId: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2", friendId: "4NUTUaQp5jdRnxQekfmWzRmVsA83"} } );
        expect(result).status(500);
    });
});

describe("Testing chatroom lists", function () {
    this.timeout(100000);
    it('Tests if the chatroom list is returned successfully with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .get('/chatroomNames')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(200);
    });
});

describe("Testing New chatroom feature", function () {
    this.timeout(100000);
    it('Tests if the new chatroom is created successfully with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newChatroom')
            .set('content-type', 'application/json')
            .send({ data : {name: "zebraTalk"} } );
        expect(result).status(200);
    });
    it('Tests if the new chatroom is created successfully with no info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newChatroom')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

describe("Testing chatroom messages list", function () {
    this.timeout(100000);
    it('Tests if the chatroom messages return correctly a name', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/chatroomMessages')
            .set('content-type', 'application/json')
            .send({data: {name: "Cooking" }});
        expect(result).status(200);
    });
    it('Tests if the chatroom messages return correctly with no info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/chatroomMessages')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

describe("Testing New community feature", function () {
    this.timeout(100000);
    it('Tests if the new community is created successfully with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newCommunity')
            .set('content-type', 'application/json')
            .send({ data : {name: "zebraTalk"} } );
        expect(result).status(200);
    });
    it('Tests if the new community is created successfully with no info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/newCommunity')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

describe("Testing community messages list", function () {
    this.timeout(100000);
    it('Tests if the community messages return correctly', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/communityPosts')
            .set('content-type', 'application/json')
            .send( {data: {name: "Biology" } } );
        expect(result).status(200);
    });
});

describe("Testing community lists", function () {
    this.timeout(100000);
    it('Tests if the community list is returned successfully', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .get('/communityNames')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(200);
    });
});

describe("Testing friend messages list", function () {
    this.timeout(100000);
    it('Tests if the friends messages return correctly with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/displayFriendMessages')
            .set('content-type', 'application/json')
            .send( {data: {userId: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2", friendId: "4NUTUaQp5jdRnxQekfmWzRmVsA83"} } );
        expect(result).status(200);
    });
    it('Tests if the friends messages return correctly with no userId', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/displayFriendMessages')
            .set('content-type', 'application/json')
            .send( {data: {friendId: "4NUTUaQp5jdRnxQekfmWzRmVsA83"} } );
        expect(result).status(500);
    });
    it('Tests if the friends messages return correctly with no friendId', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/displayFriendMessages')
            .set('content-type', 'application/json')
            .send( {data: {userId: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(500);
    });
    it('Tests if the friends messages return correctly with no info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/displayFriendMessages')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

describe("Testing friends List", function () {
    this.timeout(100000);
    it('Tests if the friends list is returned correctly with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/displayFriends')
            .set('content-type', 'application/json')
            .send({data: {userId: "sDGoU8QCPjUPdbhZAGeCgZs1NJO2"} } );
        expect(result).status(200);
    });
    it('Tests if the friends list is returned correctly with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/displayFriends')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

describe("Testing profile messages list", function () {
    this.timeout(100000);
    it('Tests if the profile messages return correctly with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/profilePosts')
            .set('content-type', 'application/json')
            .send({data: {Uid: "5H0RBSJ5uKVEvVbYTXkZ9b4OjoP2 "}});
        expect(result).status(200);
    });
    it('Tests if the profile messages return correctly with no info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/profilePosts')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

describe("Testing profile user info", function () {
    this.timeout(100000);
    it('Tests if the user info will be returned correctly with full data', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/userInfo')
            .set('content-type', 'application/json')
            .send({data: {Uid: "5H0RBSJ5uKVEvVbYTXkZ9b4OjoP2 "}});
        expect(result).status(200);
    });
    it('Tests if the user info will be returned correctly with no data', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/userInfo')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

describe("Testing recent community messages list for home page", function () {
    this.timeout(100000);
    it('Tests if the recent community messages return correctly', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .get('/mostRecentCommunityPosts')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(200);
    });
});

describe("Testing New profile feature", function () {
    this.timeout(100000);
    it('Tests if the new community is created successfully with full info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/createProfile')
            .set('content-type', 'application/json')
            .send({ data : {Uid: "oALnaAcKXMfE8CT6P75iP3Om77m2", username: "Diarmo", age: "21", dob: "10/04/2003"} } );
        expect(result).status(200);
    });
    it('Tests if the new community is created successfully with no uid', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/createProfile')
            .set('content-type', 'application/json')
            .send({ data : {username: "Diarmo", age: "21", dob: "10/04/2003"} } );
        expect(result).status(500);
    });
    it('Tests if the new community is created successfully with no username', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/createProfile')
            .set('content-type', 'application/json')
            .send({ data : {Uid: "yFMklXoEG5MfVKTg4DbmJYBHHqp2", age: "21", dob: "10/04/2003"} } );
        expect(result).status(500);
    });
    it('Tests if the new community is created successfully with no age', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/createProfile')
            .set('content-type', 'application/json')
            .send({ data : {Uid: "yFMklXoEG5MfVKTg4DbmJYBHHqp2", username: "Diarmo", dob: "10/04/2003"} } );
        expect(result).status(500);
    });
    it('Tests if the new community is created successfully with no dob', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/createProfile')
            .set('content-type', 'application/json')
            .send({ data : {Uid: "yFMklXoEG5MfVKTg4DbmJYBHHqp2", username: "Diarmo", age: "21"} } );
        expect(result).status(500);
    });
    it('Tests if the new community is created successfully with no info', async () => {
        const result = await chai.request('https://us-central1-forum-app-9d1c4.cloudfunctions.net')
            .post('/createProfile')
            .set('content-type', 'application/json')
            .send();
        expect(result).status(500);
    });
});

