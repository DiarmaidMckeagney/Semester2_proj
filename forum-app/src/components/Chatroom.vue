<template>
  <div>
    <main style="display: flex; flex-direction: row; padding: 20px;">
      <section style="width: 66%; margin-right: 4%; margin-bottom: 45px">
        <ul v-for="n in messages.length" :key="refresher" style="list-style-type:none;">
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <p>{{ messages[n-1].username }}</p>
            <p>{{ messages[n-1].message }}</p>
          </li>
        </ul>
        <div style="display: flex; align-items: flex-end; vertical-align: bottom;"><input v-model="messageBody" placeholder="enter message"/><button style="background-color: #333; display: flex; align-items: flex-end; color: white;" @click="sendMessage">Send</button></div>
      </section>
    </main>
  </div>
</template>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import { useChatroomName } from "@/stores/counter.js";
import { getAuth } from "firebase/auth";

export default {
  setup(){
    const chatroomNamestore = useChatroomName();

    return { chatroomNamestore }
  },
  data() {
    return {
      messages:[],
      refresher: 0,
      messageBody: ""
    }
  },
  created() {
    this.displayMessages();
  },
  methods: {
    displayMessages(){
      const functions = getFunctions(app);
      const chatroomMessages = httpsCallable(functions, 'chatroomMessages');
      const nameOfChatroom = this.chatroomNamestore.nameOfRoom;
      console.log(nameOfChatroom);
      chatroomMessages({name: nameOfChatroom}).then((result) => {
        this.messages = result.data;
      })
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
    }
  }
}

</script>

<style scoped>

</style>