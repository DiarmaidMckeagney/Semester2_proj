<template>
  <div id="community-page">
    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Sidebar: List of Users Joined -->
      <aside style="width: 20%; background-color: #ddd; padding-right: 30px; padding-top: 20px;">
        <ul v-for="n in communities.length" :key="refresher">
          <!-- List of Communities -->
          <li style="border: 1px solid #ccc; display:  margin: auto ;padding: 10px;padding-left: 28%; background-color: #f0f0f0; list-style-type: none;">
              <span></span>
              <button class="join-button" style="background-color: #333; color: white;" @click = "refreshCommunity(communities[n-1])">{{ communities[n-1] }}</button>
            </li>
        </ul>
      </aside>

      <!-- Community Posts -->
      <section style="width: 58%; padding: 20px;">
        <!-- Placeholder for Posts -->
        <ul v-for="n in posts.length" :key="refresher">
          <div style="background-color: #f0f0f0; margin-bottom: 20px;" @load="displayPosts()">
            <li style="list-style-type: none;">
              <span>{{ posts[n-1].username }}</span> 
              <span>{{ posts[n-1].timestamp }}</span> 
              <span>{{ posts[n-1].content }}</span> 
            </li>
          </div>
        </ul>
      </section>

      <!-- Right Sidebar for Actions like Create Community -->
      <aside style="width: 20%; background-color: #ddd; padding: 20px;">
        <router-link to="/community-finder" class="button-link">Community Finder</router-link>
        <button @click="newCommunity">Create Community</button>
      </aside>
    </main>

  </div>
</template>

<script>
import router from '@/router';
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import { useCommunityName } from '@/stores/counter';
import { reload } from 'firebase/auth';


export default {
  setup(){
    const communityNamestore = useCommunityName();

    return { communityNamestore }
  },

  data() {
    return {
      communities:[],
      posts:[],
      refresher: 0
    }
  },

  created() {
    this.communityNames();
    this.displayPosts();
  },

  methods: {
    communityNames() {
      const functions = getFunctions(app);
      const communityNames = httpsCallable(functions, 'communityNames');
      communityNames().then((result) => {
        this.communities = result.data;
      })
      this.refresher++; 
    },

    displayPosts(){
        const functions = getFunctions(app);
        const communityPosts = httpsCallable(functions, 'communityPosts');
        const nameOfCommunity = this.communityNamestore.nameOfRoom;
        communityPosts({name: nameOfCommunity}).then((result) =>{
          this.posts = result.data
        })
        this.refresher++; 
    },
    newCommunity() {
      const functions = getFunctions(app);
      const newCommunity = httpsCallable(functions, 'newCommunity');
      let comName = window.prompt("Please enter a community name", "Community" + Math.floor(Math.random() * 10000));
      if(comName != null){
        newCommunity({name: comName}).then((result) => {
        this.communityNames();
        this.refreshCommunity(comName);
        })
      }
    },
    refreshCommunity(community){
      this.communityNamestore.changeName(community);
      this.displayPosts();
    }
  }
}
    

</script>

<style scoped>
/* Add your CSS here */
.button-link {
  background-color: #333;
  color: white;
  padding: 10px;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 10px;
}
.button-link:hover {
  background-color: #555;
}
</style>
