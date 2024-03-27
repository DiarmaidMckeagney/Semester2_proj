<template>
  <div v-if="friendId !== ''" >
    <main style="display: flex; flex-direction: column; padding: 20px;color:navy;">
      <section style="width: 66%; margin-right: 4%; margin-bottom: 45px;color:navy;flex-grow: 1;">
        <ul v-for="n in FriendsMessages.length" :key="refresher" style="list-style-type:none;flex-grow: 1;">
          <li style="border: 1px solid #ccc;flex-grow: 1; margin-bottom: 10px; padding: 10px; background-color: lightcyan;border-radius:10px;">
            <p>{{ FriendsMessages[n-1].username }}</p>
            <p>{{ FriendsMessages[n-1].message }}</p>
          </li>
        </ul>
        <div style="display: flex; align-items:flex-end; margin-left:30px;vertical-align: bottom;"><input v-model="messageBody" placeholder="enter message"/><button style="background-color: lightgreen;display: flex;align-items: flex-end; color: lightcyan;border-radius:10px;" @click="sendMessage">Send</button></div>
      </section>
    </main>
  </div>
</template>

<style scoped>

</style>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import {getAuth} from "firebase/auth";
import {useFriendId} from "@/stores/counter.js"; // Import the chat component

export default {
  setup(){
    const friendIdStore = useFriendId();
    return { friendIdStore };
  },
  data() {
    return {
      FriendsMessages: [],
      refresher: 0,
      messageBody: "",
      friendId: ""
    }
  },
  created() {
    this.friendId = this.friendIdStore.getFriendId;
    this.friendsMessages();
  },

  methods: {
    friendsMessages() {
      const functions = getFunctions(app);
      const displayFriendMessages = httpsCallable(functions, 'displayFriendMessages');
      const auth = getAuth();
      const user = auth.currentUser;
      displayFriendMessages({userId: user.uid, friendId: this.friendId}).then((result) => {
        console.log(result);
        this.FriendsMessages = result.data;
      })
      this.refresher++;
    },
    sendMessage() {
      const functions = getFunctions(app);
      const sendMessage = httpsCallable(functions, 'newFriendMessage');
      const auth = getAuth();
      const user = auth.currentUser;
      sendMessage({userId: user.uid, username: user.displayName, friendId: this.friendId, message: this.messageBody}).then((result) => {
        this.friendsMessages();
      });
      this.messageBody = "";
    }
  }
}
</script>