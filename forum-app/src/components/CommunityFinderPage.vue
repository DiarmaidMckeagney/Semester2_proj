
For the "Community Finder" page, if you wish to have a header similar to other pages, centered and without additional decorative shapes, here's the updated code:

vue
Copy code
<template>
  <div id="community-finder-page">

    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Community Search and Details Section -->
      <section style="width: 70%; padding: 10px;">
        <!-- Search Bar -->
        <div style="background-color: #f0f0f0; margin-bottom: 20px; padding: 20px;">Search Bar Placeholder</div>
        <ul v-for="n in communities.length" :key="refresher">
          <!-- List of Communities -->
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;list-style-type: none;">
            <div class="row">
              <div class="col">
                  <span style="font-size: 18px;"> <strong>{{ communities[n-1] }}  </strong></span>
              </div>
              <div class="col-auto">
                  <button class="btn btn-primary join-button" @click="moveToCommunity(communities[n-1])">Join</button>
              </div>
          </div>
            </li>
        </ul>
        <ul>
          <li class="createCommunityList" style="display: inline-flex;list-style-type: none; border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <span>Create New Community</span>
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
                          <label for="communityName">Chatroom Name</label>
                          <input v-model="communityName" type="text" class="form-control" id="communityLabel" aria-describedby="NameHelp" placeholder="Enter Name">
                        </div>
                      </div>
                      <div class="modal-footer border-top-0 d-flex justify-content-center">
                        <button @click="newCommunity" type="button" data-dismiss="modal" class="btn btn-success">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </modal>
          </li>
        </ul>
      </section>

      <!-- Tag Search and List Section -->
      <aside style="width: 28%; background-color: #ddd; padding: 10px;">
        <div>
          <h2>Tag Search</h2>
          <div>Tag Search Placeholder</div>
        </div>
        <div style="margin-top: 20px;">
          <h2>Tag List</h2>
          <div>Tag List Placeholder</div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import router from '@/router';
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";

import { useCommunityName } from "@/stores/counter.js";


export default {
  setup(){
    const communityNamestore = useCommunityName();

    return { communityNamestore }
  },

  data() {
    return {
      communities:[],
      refresher: 0,
      communityName: ""
    }
  },
  created() {
    this.communityNames();
  },
  methods: {
    communityNames() {
      const functions = getFunctions(app);
      const communityNames = httpsCallable(functions, 'communityNames');
      communityNames().then((result) => {
        this.communities = result.data;
        console.log(result.data);
      })
      this.refresher++;
    },
    newCommunity() {
      const functions = getFunctions(app);
      const newCommunity = httpsCallable(functions, 'newCommunity');
      newCommunity({name: this.communityName}).then((result) => {
        this.communityNames();
      })
    },

    moveToCommunity(community){
      this.communityNamestore.changeName(community);
      router.push({path: "/community"});
    }
  }
}


</script>

<style scoped>
/* Scoped CSS styles go here */
</style>
<script setup>
</script>
