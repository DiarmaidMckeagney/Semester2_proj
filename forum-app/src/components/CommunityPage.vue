<template>
  <div id="community-page">
    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Sidebar: List of Users Joined -->
      <aside style="width: 20%; background-color: #ddd; padding-right: 30px; padding-top: 20px;">
        <router-link to="/community-finder" class="button-link" style="margin-left: 80px; padding: 10px 10px 10px 10px;">Back to Community Finder</router-link>
        <ul v-for="n in communities.length" :key="refresher">
          <!-- List of Communities -->
          <li style="border: 1px solid #ccc; margin: auto ;padding: 10px 10px 10px 28%;background-color: #f0f0f0; list-style-type: none;">
              <span></span>
              <button class="join-button" style="background-color: #333; color: white;" @click = "refreshCommunity(communities[n-1])">{{ communities[n-1] }}</button>
            </li>
        </ul>
      </aside>

      <!-- Community Posts -->
      <section style="width: 58%; padding: 20px;" @load="displayPosts">
        <ul v-for="n in posts.length" :key="refresher">
            <li style="list-style-type: none; background-color: #f0f0f0; margin-bottom: 20px;">
              <h2><span>{{ posts[n-1].title }}</span></h2><br>
              <h5><span>{{ posts[n-1].username }}</span></h5><br>
              <span>{{ posts[n-1].mainText }}</span>
            </li>
        </ul>
      </section>

      <!-- Right Sidebar for Actions like Create Community -->
      <aside style="width: 20%; background-color: #ddd; padding: 20px;">
        <h2 style="margin-left: 60px; margin-bottom: 20px">New Post</h2>
        <div style="display: flex; flex-direction: row; align-items: flex-end; vertical-align: bottom; margin-bottom: 30px">
          <input v-model="title" placeholder="enter title"/>
        </div>
        <div>
          <textarea v-model="mainBodyOfText" placeholder="enter body of post"></textarea>
        </div>
        <div><button @click="sendPost" style= "margin-bottom: 10px" type="button" class="btn btn-success">Post</button></div>
      </aside>
    </main>

  </div>
</template>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import { useCommunityName } from '@/stores/counter';
import {getAuth} from "firebase/auth";



export default {
  setup(){
    const communityNamestore = useCommunityName();

    return { communityNamestore }
  },

  data() {
    return {
      communities:[],
      posts:[],
      refresher: 0,
      title: "",
      mainBodyOfText: ""
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
    refreshCommunity(community){
      this.communityNamestore.changeName(community);
      this.displayPosts();
    },
    sendPost(){
      const functions = getFunctions(app);
      const newPost = httpsCallable(functions, 'newPost');
      const nameOfCommunity = this.communityNamestore.nameOfRoom;
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;
      newPost({name:nameOfCommunity, uid: userId, title: this.title, mainText: this.mainBodyOfText, username: user.displayName}).then(() => {
        this.displayPosts();
      });
      this.title = "";
      this.mainBodyOfText = "";
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
