<template>
  <div id="chatrooms-page">

    <!-- Main Content Section -->
    <main style="display: flex; flex-direction: row; ">
      <!-- Chatroom List Section -->
      <section style="width: 75%;">
        <h2 style="margin-top:20px;margin-left:30px;color:navy;"> What's New in Chatrooms</h2>
        <ul v-for="n in chatrooms.length" :key="refresher">
          <!-- List of Chatrooms -->
          <li :style="{ backgroundColor: chatroomColors[(n-1) % chatroomColors.length] }" style="margin-top:10px;color: navy; margin-bottom: 10px; border-radius: 5px; padding: 20px; list-style-type: none; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
              <i class="bi bi-chat-square-text" style="font-size: 24px; margin-right: 10px;"></i>
              <span>{{ chatrooms[n-1] }}</span>
            </div>
            <button class="join-button" style="margin-left: auto; background-color:navy; color: white;border-radius:5px;" @click="moveToChatroom(chatrooms[n-1])">Join</button>
          </li>
          <!-- Create New Chatroom -->
        </ul>

      </section>

      <!-- Box on the Right -->
      <section style="width: 25%;margin-top:67px;margin-right:50px;">
        <!-- Content moved from Create Chatroom Section -->
        <!-- This content is now below "Topic 3" -->
        <ul>
          <li class="createchatroomlist">
            <span style="color:navy;margin-left:-10px;">New Chatroom</span>
            <modal class="CreateChat">
              <div class="container">
                <button type="button" class="create-button" style="background-color:green;margin-left:-10px; color: white;border-radius:5px;" data-toggle="modal" data-target="#createForm">
                  Create
                </button>
              </div>

              <div class="modal fade" id="createForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                      <h5 class="modal-title" id="exampleModalLabel"> Create New Chatroom </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="chatroomName">Chatroom Name</label>
                          <input v-model="chatroomName" type="text" class="form-control" id="chatroomLabel" aria-describedby="NameHelp" placeholder="Enter Name">
                        </div>
                      </div>
                      <div class="modal-footer border-top-0 d-flex justify-content-center">
                        <button @click="newChatroom" type="button" data-dismiss="modal" class="btn btn-success">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </modal>
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
import router from "@/router.js";

export default {
  setup(){
    const chatroomNamestore = useChatroomName();

    return { chatroomNamestore }
  },
  data() {
    return {
      chatrooms:[],
      chatroomName: "",
      refresher: 0,
      chatroomColors:["LightPink","LightBlue", "PaleGreen", "Lavender", "SkyBlue","LightSalmon", "LightGreen", "Gold",  "LightSteelblue", "Pink","LightGrey"]
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
        this.chatrooms = result.data;
      })
      this.refresher++;
    },
    newChatroom() {
      const functions = getFunctions(app);
      const newChatroom = httpsCallable(functions, 'newChatroom');
      newChatroom({name: this.chatroomName}).then((result) => {
        this.chatroomNames();
      })
    },
    moveToChatroom(chatroom){
      this.chatroomNamestore.changeName(chatroom);
      router.push({path: "/chatroom"});
    }
  }
}

</script>

<style scoped>
.createchatroomlist {
  display: flex; /* Use flex to make it a flex container */
  justify-content: space-between; /* This will place the text and button on opposite ends */
  align-items: center; /* This will vertically center the items */
  border: 1px solid #ccc;
  padding: 20px;
  background-color: lightgreen;
  border-radius: 10px;
  flex-wrap: wrap;
}
#chatrooms-page{
  min-height:85vh ;
  background-color: beige;
}
</style>
