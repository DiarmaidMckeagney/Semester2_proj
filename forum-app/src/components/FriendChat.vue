<template>
  <div v-if="friendId !== ''" >
    <main style="display: flex; flex-direction: row; padding: 20px;color:navy;">
      <section style="width: 66%; margin-right: 4%; margin-bottom: 45px;color:navy;">
        <ul v-for="n in FriendsMessages.length" :key="refresher" style="list-style-type:none;">
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <p>{{ FriendsMessages[n-1].username }}</p>
            <p>{{ FriendsMessages[n-1].message }}</p>
          </li>
        </ul>
        <div style="display: flex; align-items: flex-end; margin-left:30px; vertical-align: bottom;"><input v-model="messageBody" placeholder="enter message"/><button style="background-color: #333;display: flex;align-items: flex-end; color: white;" @click="sendMessage">Send</button></div>
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
import {useFriendId} from "@/stores/counter.js";

export default {
  setup(){
    const friendIdStore = useFriendId();
    return { friendIdStore };
  },
  data() {
    return {
      FriendsMessages: [],
      friendId: "",
      refresher: 0,
      messageBody: ""
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