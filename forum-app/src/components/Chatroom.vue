<template>
  <div id="app">
    <main class="main-content">
      <!-- Chat Messages Section -->
      <section class="chat-section">
        <ul v-for="n in messages.length" :key="refresher" class="message-list">
          <li class="message-item">
            <div :class="{ 'messageOther': !isOwnMessage(messages[n-1]), 'messageOwn': isOwnMessage(messages[n-1]) }">
              <strong @click="moveToProfile(messages[n-1].uid)">{{ messages[n-1].username }}</strong>
              <p>{{ messages[n-1].message }}</p>
            </div>
          </li>
        </ul>
        <div class="input-section">
          <textarea v-model="input"></textarea>
          <svg @click="toggleEmojiPicker" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
        </svg>
          <Picker v-if="showEmojiPicker" @emoji-click="addEmoji" />
          <input v-model="messageBody" placeholder="Enter message" @keyup.enter="sendMessage" class="message-input">
          
        </div>
      </section>

      <!-- Users List Section -->
      <aside class="users-section">
        <h3>Users</h3>
        <ul v-for="n in usersList.length" :key="refresher">
          <li><strong @click="moveToProfile(usersList[n-1].id)">{{ usersList[n -1].name }}</strong></li>
        </ul>
      </aside>
    </main>
  </div>
</template>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import { useChatroomName } from "@/stores/counter.js";
import { useUserId } from "@/stores/counter.js";
import { getAuth } from "firebase/auth";
import { Picker } from 'vue-emoji';
import router from "@/router.js";

export default {
  components:{
    Picker
  },
  setup(){
    const chatroomNamestore = useChatroomName();
    const userIdStore = useUserId();
    
    return { chatroomNamestore, userIdStore };
  },
  data() {
    return {
      messages:[],
      refresher: 0,
      messageBody: "",
      usersList: [],
      showEmojiPicker: false
    }
  },
  created() {
    this.displayMessages();
  },

  methods: {
    moveToProfile(id){
      if(id != null){
        this.userIdStore.changeName(id);
        router.push({path: "/profile"});
      }
    },
    isOwnMessage(message) {
      const auth = getAuth();
      console.log("Your username is " + message.username);
      return message.username === auth.currentUser.displayName;

    },
    displayMessages(){
      const functions = getFunctions(app);
      const chatroomMessages = httpsCallable(functions, 'chatroomMessages');
      const nameOfChatroom = this.chatroomNamestore.nameOfRoom;
      console.log(nameOfChatroom);
      chatroomMessages({name: nameOfChatroom}).then((result) => {
        this.messages = result.data;
        console.log(this.messages);
      });
      setTimeout(() => {this.userList();}, 1000);
      this.refresher++;
    },
    sendMessage(){
      const functions = getFunctions(app);
      const sendMessage = httpsCallable(functions, 'newMessage');
      const nameOfChatroom = this.chatroomNamestore.nameOfRoom;
      const auth = getAuth();
      const user = auth.currentUser;
      sendMessage({name: nameOfChatroom,username: user.displayName, message: this.messageBody, uid: user.uid}).then((result) => {
        this.displayMessages();
      });
      this.messageBody = "";
    },

    userList(){
      this.usersList = [];
      console.log(this.messages);
      console.log("length: " + this.messages.length);
      for (let i = 0; i < this.messages.length; i++) {
        console.log({name: this.messages[i].username, id: this.messages[i].uid});
        if(this.usersList.map(function(e) { return e.name; }).indexOf(this.messages[i].username) <= 0){
          this.usersList.push({name: this.messages[i].username, id: this.messages[i].uid});
        }
      }
      console.log(this.usersList);
    },
    addEmoji(emoji) {

      this.messageBody += emoji.native;
    },

    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
  }
};
</script>
<style scoped>
.main-content {
  display: flex;
  padding: 20px;
  height: calc(100vh - 40px); /* Adjust based on your header/footer */
}

.chat-section {
  width: 75%;
  margin-right: 2%; /* Optional spacing between sections */
  justify-content: space-between;
  overflow: hidden;
  overflow-y: scroll;
}

.message-list {
  overflow-y: auto;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.message-item {
  margin-bottom: 10px;
}
.messageOther {
  position: relative;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: lightblue;
  margin-left: 2%;
  border-radius: 10px;
  max-width: 80%;
}

.messageOther::before {
  content: "";
  position: absolute;
  bottom: 3%; /* Adjust this value for the position of the triangle */
  left: -28px; /* Adjust this value for the position of the triangle */
  border-width: 16px; /* Adjust this value to make the triangle bigger */
  border-style: solid;
  border-color: transparent lightblue transparent transparent;
}

.messageOwn {
    position: relative;
    border: 1px solid #ccc;
    padding: 20px;
    background-color: lightgreen;
    margin-left: auto; /* Align to the right side of the screen */
    margin-right: 2%; /* Optional margin for spacing */
    border-radius: 10px;
    max-width: 80%;
  }

  .messageOwn::after {
    content: "";
    position: absolute;
    bottom: 3%; /* Adjust this value for the position of the triangle */
    right: -28px;
    border-width: 16px; /* Adjust this value to make the triangle bigger */
    border-style: solid;
    border-color: transparent transparent transparent lightgreen; /* Triangle on the right side */
}



.message-bubble {
  background-color: LightBlue;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid navy;
  max-width: 80%;
}

.input-section {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
}

.emoji-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.message-input {
  flex: 1;
  margin-left: 10px;
  border-radius: 5px;
  border: 2px solid #bbb;
  padding: 10px;
}

.users-section {
  width: 25%;
  padding: 20px;
  background-color: lightblue; /* Slight contrast to main chat area */
  border:2px solid navy;
  border-radius: 10px;
  overflow-y: auto; /* For scrolling if many users */
}

h3 {
  margin-top: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>