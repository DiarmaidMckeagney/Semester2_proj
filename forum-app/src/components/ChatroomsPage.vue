<template>
  <div id="chatrooms-page">

    <!-- Main Content Section -->
    <main style="display: flex; flex-direction: row; padding: 20px;">
      <!-- Chatroom List Section -->
      <section style="width: 66%; margin-right: 4%; margin-bottom: 15px">
        <h2>What's New in Chatrooms</h2>
        <ul v-for="n in chatrooms.length" :key="refresher">
          <!-- List of Chatrooms -->
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <span>{{ chatrooms[n-1] }}</span>
            <button class="join-button" style="background-color: #333; color: white;" @click="moveToChatroom(chatrooms[n-1])">Join</button>
          </li>
          <!-- Create New Chatroom -->
        </ul>
        <ul>
          <li class="createchatroomlist" style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <span>Create New Chat</span>
            <modal class="CreateChat">
              <div class="container">
                <button type="button" class="create-button" style="background-color: #333; color: white;" data-toggle="modal" data-target="#createForm">
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
      refresher: 0
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
  display: inline-flex;
}
</style>
