
<template>
  <div id="community-finder-page">

    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between;margin-top:20px;">
      <!-- Community Search and Details Section -->
      <section style="width: 75%;">
        <!-- Adjusted Search Bar and Button -->
        <div style="display: flex; align-items: center; background-color: lightblue; margin-top: 30px; margin-bottom: 20px; padding: 15px; border-radius: 20px; margin-left: 30px;">
          <input v-model="searchTerm" type="text" placeholder="Search for communities..." style="flex-grow: 1; padding: 10px; margin-right: 10px;"/>
          <button @click="searchForCommunity" style="padding: 10px; color: navy; white-space: nowrap;">Search</button>
        </div>


        <!-- Display the search result as a link if a community is found -->
        <div v-if="searchedCommunity" style="padding: 30px; margin-left: 25px;">
          <p>Found Community: <a href="#" @click.prevent="moveToCommunity(searchedCommunity)" style="color: blue; cursor: pointer;">{{ searchedCommunity }}</a></p>
        </div>
        <ul v-for="n in communities.length" :key="refresher">
          <!-- List of Communities -->
          <li style=" margin-bottom: 10px;color:Navy; padding: 15px; border-radius: 20px; background-color: lightblue; list-style-type: none;">
            <div class="row">
              <div class="col">
                <!-- Check if the community is 'Gaming' and display the controller icon -->
                <i v-if="communities[n-1] === 'Gaming'" class="bi bi-controller" style="margin-right: 10px;font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Chemistry'" class="bi bi-funnel" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Biology'" class="bi bi-bug" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Geography'" class="bi bi-globe" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Computer Science'" class="bi bi-laptop" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Maths'" class="bi bi-infinity" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Physics'" class="bi bi-lightbulb" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'History'" class="bi bi-book" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Music'" class="bi bi-earbuds" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Homework'" class="bi bi-clipboard" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'English'" class="bi bi-blockquote-left" style="margin-right: 10px; font-size: 24px;"></i>
                <i v-if="communities[n-1] === 'Code'" class="bi bi-code-square" style="margin-right: 10px; font-size: 24px;"></i>

                <span style="font-size: 18px; cursor: pointer;" @click="moveToCommunity(communities[n-1])"><strong>{{ communities[n-1] }}</strong></span>
              </div>
            </div>
          </li>
        </ul>


      </section>

      <!-- Tag Search and List Section -->
      <aside style="width:27.5%; margin-top:27px;margin-right:50px;">

        <ul>
          <li class="createCommunityList">
            <span style="color:navy;margin-left:-10px;">New Community</span>
            <modal class="CreateChat">
              <div class="container">
                <button type="button" class="create-button" style="background-color:navy;margin-left:-10px; border-radius:5px;color: white;" data-toggle="modal" data-target="#createForm">
                  Create
                </button>
              </div>

              <div class="modal fade" id="createForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                      <h5 class="modal-title" id="exampleModalLabel"> Create Community</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="communityName">Community Name</label>
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
      communityName: "",
      searchTerm: "", // This will hold the value from the search input
      searchedCommunity: null,

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

    searchForCommunity() {
      const searchResult = this.communities.find((community) =>
          community.toLowerCase() === this.searchTerm.toLowerCase()
      );
      this.searchedCommunity = searchResult || null;
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
#community-finder-page {
min-height:95vh;
  background-color: beige;
}
.createCommunityList{
  display: flex; /* Use flex to make it a flex container */
  justify-content: space-between; /* This will place the text and button on opposite ends */
  align-items: center; /* This will vertically center the items */
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 20px;
  background-color: lightblue;
  border-radius: 10px;
  flex-wrap: wrap;
}
</style>
<script setup>
</script>