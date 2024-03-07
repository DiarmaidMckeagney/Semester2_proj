<template>
  <div id="friends-message-page">

    <!-- Main Content Section -->
    <main style="display: flex; padding: 20px;">
      <!-- Friends List Section -->
      <aside style="width: 20%; background-color: #ddd; padding: 20px;">
        <h2>Friends</h2>
        <div style="margin-bottom: 10px;">Search Placeholder</div>
        <div>
          <ul v-for="n in FriendsNames" :key="refresher">
            <li><button>{{ FriendsNames[n-1] }}</button></li>
          </ul>
        </div>
      </aside>

      <!-- Placeholder for the Chat Box -->
      <section style="flex-grow: 1; background-color: #f0f0f0; padding: 20px;">
        <div style="background-color: white; padding: 20px; margin-bottom: 10px;">Profile Pic Placeholder</div>
        <div style="background-color: white; padding: 20px; margin-bottom: 10px;">Name / Bio Placeholder</div>
        <!-- Placeholder for messages -->
        <div style="background-color: white; padding: 20px; margin-bottom: 10px;">Message Box Placeholder</div>
        <!-- Text Entry Box Placeholder -->
        <div style="background-color: white; padding: 20px; margin-top: auto;">Text Entry Box Placeholder</div>
      </section>
    </main>

  </div>
</template>

<style scoped>
/* Add your CSS here, and replace inline styles when you're ready */
</style>
<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import {getAuth} from "firebase/auth";

export default {
  data() {
    return {
      FriendsNames: [],
      refresher: 0
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
    }
  }
}
</script>