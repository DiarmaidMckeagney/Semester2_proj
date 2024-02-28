<template>
  <div id="chatrooms-page">

    <!-- Main Content Section -->
    <main style="display: flex; flex-direction: row; padding: 20px;">
      <!-- Chatroom List Section -->
      <section style="width: 66%; margin-right: 4%;">
        <h2>What's New in Chatrooms</h2>
        <ul v-for="n in chatrooms.length">
          <!-- List of Chatrooms -->
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <span>{{ chatrooms[n-1] }}</span>
            <button class="join-button" style="background-color: #333; color: white;">Join</button>
          </li>
          <!-- Create New Chatroom -->
        </ul>
        <ul>
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <span>Create New Chat</span>
            <button class="join-button" style="background-color: #333; color: white;">Create</button>
          </li>
        </ul>
      </section>

      <!-- Box on the Right -->
      <section style="width: 30%; background-color: #f0f0f0; padding: 10px;">
        <!-- Content moved from Create Chatroom Section -->
        <!-- This content is now below "Topic 3" -->
      </section>
    </main>
  </div>
</template>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";


export default {
  data() {
    return {
      chatrooms:[]
    }
  },
  created() {
    this.chatroomNames();
  },
  methods: {
    chatroomNames() {
      const functions = getFunctions(app);
      const chatroomNames = httpsCallable(functions, 'chatroomNames');
      chatroomNames().then((result) => {
        console.log(result);
        this.chatrooms = result.data;
      })
    },
  }
}

</script>

<style scoped>
/* Add your CSS here */
</style>
