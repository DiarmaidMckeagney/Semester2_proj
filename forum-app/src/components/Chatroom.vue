<template>
  <div id="app">
    <main class="main-content">
      <!-- Chat Messages Section -->
      <section class="chat-section">
        <ul v-for="n in messages.length" :key="refresher" class="message-list">
          <li class="message-item">
            <div class="message-bubble">
              <strong @click="moveToProfile(messages[n-1].uid)">{{ messages[n-1].username }}</strong>
              <p>{{ messages[n-1].message }}</p>
            </div>
          </li>
        </ul>
        <div class="input-section">
          <img @click="toggleEmojiPicker" src="@/assets/emoji.png" alt="emoji icon" class="emoji-icon">
          <Picker v-if="showEmojiPicker" @emoji-click="addEmoji" />
          <input v-model="messageBody" placeholder="Enter message" @keyup.enter="sendMessage" class="message-input">
        </div>
      </section>

      <!-- Users List Section -->
      <aside class="users-section">
        <h3>Users</h3>
        <ul>
          <li v-for="user in users" :key="user.id">{{ user.name }}</li>
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

    return { chatroomNamestore }
  },
  data() {
    return {
      messages:[],
      refresher: 0,
      messageBody: "",
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
        console.log(this.userIdStore.getUserId);
        router.push({path: "/profile"});
      }
    },
    displayMessages(){
      const functions = getFunctions(app);
      const chatroomMessages = httpsCallable(functions, 'chatroomMessages');
      const nameOfChatroom = this.chatroomNamestore.nameOfRoom;
      console.log(nameOfChatroom);
      chatroomMessages({name: nameOfChatroom}).then((result) => {
        this.messages = result.data;
      });
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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