<template>
  <div>
    <main style="display: flex; flex-direction: row; padding: 20px;">
      <section style="width: 66%; margin-right: 4%; margin-bottom: 45px">
        <ul v-for="n in messages.length" :key="refresher" style="list-style-type:none;">
        <li style="position: relative; list-style: none; margin-bottom: 10px;">
          <div style="position: relative; padding: 10px; background-color: #e6f2ff; border-radius: 10px; max-width: 80%; overflow: hidden;">
            <strong>{{ messages[n-1].username }}</strong>
            <p>{{ messages[n-1].message }}</p>
          </div>
          <div style="position: absolute; top: 60px; left: -10px; width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 10px solid #e6f2ff;"></div>
        </li>
      </ul>
        <div style=" border-radius: 10px; position: fixed; bottom: 65px; left: 0; width: 66%; margin-right: 4%; display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: #f0f0f0;">
         <img  @click="toggleEmojiPicker"  src="@/assets/emoji.png" alt="emoji icon" style="width: 40px; height: 40px; text-align: center;"> 
         <Picker v-if="showEmojiPicker"  @emoji-click="addEmoji" />
        <input v-model="messageBody" placeholder="Enter message"  @keyup.enter="sendMessage" style="flex: 1; margin-right: 10px;" >
       </div>
      </section>
    </main>
  </div>
</template>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import { useChatroomName } from "@/stores/counter.js";
import { getAuth } from "firebase/auth";
import { Picker } from 'vue-emoji';

export default {
  components:{
    Picker
  },
  setup(){
    const chatroomNamestore = useChatroomName();

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
    },
    sendMessage(){
      const functions = getFunctions(app);
      const sendMessage = httpsCallable(functions, 'newMessage');
      const nameOfChatroom = this.chatroomNamestore.nameOfRoom;
      const auth = getAuth();
      const user = auth.currentUser;
      sendMessage({name: nameOfChatroom,username: user.displayName, message: this.messageBody}).then((result) => {
        console.log(result);
        this.displayMessages();

      });
        this.messageBody = "";
      },
        addEmoji(emoji)
        {
        this.messageBody += emoji.native;
        },

        toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        },
      }
    };
</script>
