<template>
  <div id="friends-message-page">

    <main style="display: flex; padding: 20px; flex-wrap: wrap;">
      <aside style="width: 15%; background-color: lightblue; border-radius: 10px; padding: 20px;margin-bottom:10px; display: flex; flex-direction: column;">
        <div style="text-align: center; margin-bottom: 20px;"><h4>Friends</h4></div>
        <div :key="refresher" style="flex-grow: 1; overflow-y: auto;">
          <ul v-if="FriendsNames.length !== 0" v-for="n in FriendsNames.length" :key="refresher" style="margin: 0; padding: 0;">
            <li :style="{
      border: '1px solid #ccc',
      margin: '10px auto',
      padding: '10px',
      backgroundColor: isActiveChat(FriendsNames[n-1].id) ? 'lightgreen' : 'lightcyan',
      listStyleType: 'none',
      borderRadius: '10px',
      boxShadow: isActiveChat(FriendsNames[n-1].id) ? '0 0 10px #006400' : 'none'
    }">
              <p style="color: navy; margin: 0; padding-left: 20px; cursor: pointer;" @click="openChat(FriendsNames[n-1].id)">
                {{ FriendsNames[n-1].name.name }}
              </p>
            </li>
          </ul>
        </div>
      </aside>
      <section style="flex-grow: 1; width: 70%; background-color: lightblue; padding: 20px; border-radius: 10px;">
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
    isActiveChat(friendId) {
      return this.friendIdStore.friendId === friendId;
    },
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
    openChat(id) {
      this.friendIdStore.changeFriendId(id); // Update shared state
      this.friendId = id; // Update local state to trigger reactivity
      this.chatRefresher++; // Trigger updates if necessary
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
aside {
  width: 20%;
  background-color: lightblue;
  margin-right:2%;


  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start; /* Align items at the start */
  gap: 20px; /* Adds space between the flex items */
}

aside h4 {
  color: navy;
  text-align: center; /* Center the title */
  margin: 0 0 20px 0; /* Adjusted margin to remove extra space on the left */
}

aside ul {
  padding: 0;
  margin-left: 0; /* Ensures the list is aligned to the left edge of the 'aside' */
}

aside li {
  list-style-type: none;
  margin-bottom: 10px; /* Add space between list items */
  display: flex;
  align-items: center; /* Align items vertically */
  gap: 10px; /* Space between avatar/icon and name if added */
}

aside li p {
  cursor: pointer; /* Change cursor on hover over names */
  margin: 0; /* Remove default margins */
  text-align: left; /* Ensures text within 'p' is aligned to the left */
  width: 100%; /* Ensures the paragraph tag takes the full width of the list item */
}
</style>