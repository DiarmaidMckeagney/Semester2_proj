<template>
  <div>
    <main style="display: flex; flex-direction: row; padding: 20px;">
      <section style="width: 66%; margin-right: 4%;">
        <ul v-for="n in messages.length" :key="refresher">
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <span>{{ messages[n-1].username }}</span>
            <span>{{ messages[n-1].timestamp }}</span>
            <span>{{ messages[n-1].message }}</span>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import { useChatroomName } from "@/stores/counter.js";

export default {
  setup(){
    const chatroomNamestore = useChatroomName();

    return { chatroomNamestore }
  },
  data() {
    return {
      messages:[],
      refresher: 0
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
        console.log(result)
        this.messages = result.data;
      })
      this.refresher++;
    }
  }
}

</script>

<style scoped>

</style>