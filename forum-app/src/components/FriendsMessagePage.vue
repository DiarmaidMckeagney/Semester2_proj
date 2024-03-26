<template>
  <div id="friends-message-page">

    <!-- Main Content Section -->
    <main style="display: flex; padding: 20px;">

      <aside style="width: 20%; background-color: lightblue; margin-right: 5%; border-radius: 20px; padding: 20px; display: flex; flex-direction: column;">
        <h4 style="color: navy;margin-left:20%; margin-bottom: 20px;">Friends</h4>
        <div>
          <ul v-if="FriendsNames.length !== 0" v-for="n in FriendsNames.length" :key="refresher">
            <li style="list-style-type:none;"><button @click="openChat(FriendsNames[n-1].id)">{{ FriendsNames[n-1].name.name }}</button></li>


          </ul>
        </div>
      </aside>

      <!-- Placeholder for the Chat Box -->
      <section style="flex-grow: 1; background-color: #f0f0f0; padding: 20px;">
        <FriendChat :key="chatRefresher"></FriendChat>
      </section>
    </main>

  </div>
</template>


<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import {getAuth} from "firebase/auth";
import FriendChat from "@/components/FriendChat.vue"; // Import the chat component
import {useFriendId} from "@/stores/counter.js"; // Import the chat component

export default {
  components: {
    FriendChat
  },
  setup(){
    const friendIdStore = useFriendId();
    return { friendIdStore };
  },
  data() {
    return {
      FriendsNames: [],
      refresher: 0,
      chatRefresher: 0,
      friendId: ""
    }
  },
  created() {
    this.friendsNames();
  },
  methods: {
    friendsNames() {
      const functions = getFunctions(app);
      const friendsNames = httpsCallable(functions, 'displayFriends');
      const auth = getAuth();
      const user = auth.currentUser;
      friendsNames({userId: user.uid}).then((result) => {
        console.log(result);
        this.FriendsNames = result.data;
      })
      this.refresher++;
    },
    openChat(id){
      this.friendIdStore.changeFriendId(id);
      this.chatRefresher++;
    }
  }
}
</script>
<style scoped>
#friends-message-page{
  min-height: 85vh;
  background-color: beige;
  color: navy; /* Set the text color to navy */
}
/* Add your CSS here, and replace inline styles when you're ready */
</style>