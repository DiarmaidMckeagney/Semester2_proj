<template>
  <div id="community-page">
    <!-- Main Content Section -->
    <main>
      <!-- Sidebar: List of Users Joined -->
      <aside class="sidebar">
        <router-link to="/community-finder" class="button-link" style="background-color: black; font-size: large;"> Back to Community Finder</router-link>
        <ul v-for="n in communities.length" :key="refresher">
          <!-- List of Communities -->
          <li  :class="{ 'btn-selected': selectedCommunity === communities[n-1] }" class="join-button-li" :style="{ backgroundColor: chatroomColors[(n-1) % chatroomColors.length] }">
            <button :style="{ backgroundColor: chatroomColors[(n-1) % chatroomColors.length] }"  class="join-button" @click="refreshCommunity(communities[n-1])">{{ communities[n-1] }} </button>
          </li>
        </ul>
      </aside>

      <!-- Community Posts -->
      <section>
        <ul v-for="n in posts.length" :key="refresher">
          <li>
            <h2>{{ posts[n-1].title }}</h2>
            <h5 @click="moveToProfile(posts[n-1].uid)">{{ posts[n-1].username }}</h5>
            <span>{{ posts[n-1].mainText }}</span>
          </li>
        </ul>
      </section>

      <!-- Right Sidebar for Actions like Create Community -->
      <aside class="sidebar">
        <h2>New Post</h2>
        <div class="input-container">
          <input v-model="title" placeholder="Enter title"/>
        </div>
        <div class="textarea-container">
          <textarea v-model="mainBodyOfText" placeholder="Enter body of post"></textarea>
        </div>
        <div>
          <button @click="sendPost" class="post-button">Post</button>
        </div>
      </aside>
    </main>
  </div>
</template>


<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import { useCommunityName } from '@/stores/counter';
import { useUserId } from "@/stores/counter.js";
import {getAuth} from "firebase/auth";
import router from "@/router.js";

export default {
  setup() {
    const communityNamestore = useCommunityName();
    const userIdStore = useUserId();
    
    return { communityNamestore, userIdStore };
  },

  data() {
    return {
      communities: [],
      posts: [],
      refresher: 0,
      title: "",
      mainBodyOfText: "",
      selectedCommunity: null, // Track the selected community
      chatroomColors:["LightPink","LightBlue", "PaleGreen", "Lavender", "SkyBlue","LightSalmon", "LightGreen", "Gold",  "LightSteelblue", "Pink","LightGrey"]
    };
  },

  created() {
    this.communityNames();
    this.displayPosts();
  },

  methods: {
    moveToProfile(id){
      if(id != null){
        this.userIdStore.changeName(id);
        console.log(this.userIdStore.getUserId);
        router.push({path: "/profile"});
      }
    },
    communityNames() {
      const functions = getFunctions(app);
      const communityNames = httpsCallable(functions, 'communityNames');
      communityNames().then((result) => {
        this.communities = result.data;
      });
      this.refresher++;
    },

    displayPosts() {
      const functions = getFunctions(app);
      const communityPosts = httpsCallable(functions, 'communityPosts');
      const nameOfCommunity = this.communityNamestore.nameOfRoom;
      communityPosts({name: nameOfCommunity}).then((result) => {
        this.posts = result.data;
      });
      this.refresher++;
    },

    refreshCommunity(community) {

      this.selectedCommunity = community; // Set the selected community here
      console.log(this.selectedCommunity);
      this.communityNamestore.changeName(community);
      this.displayPosts();
    },

    sendPost() {
      const functions = getFunctions(app);
      const newPost = httpsCallable(functions, 'newPost');
      const nameOfCommunity = this.communityNamestore.nameOfRoom;
      const auth = getAuth();
      const user = auth.currentUser;
      const userId = user.uid;
      newPost({name: nameOfCommunity, uid: userId, title: this.title, mainText: this.mainBodyOfText, username: user.displayName}).then(() => {
        this.displayPosts();
      });
      this.title = "";
      this.mainBodyOfText = "";
    }
  }
}
</script>

<style scoped>
/* General layout and coloring */
#community-page {
  background-color: beige;
}
.btn-selected {
  background-color: red; /* Or your desired color */
  border-color: red; /* Adjust border color if needed */
  filter: drop-shadow(1px 1px 5px red);
}

.selected-community {
  background-color: navy;
  color: white;
  border-radius: 5px;
  padding: 10px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
main {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.sidebar {
  width: 20%;
  background-color: lightblue;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}


.button-link, .post-button {
  background-color: navy;
  color: white;
  border-radius: 5px;
  padding: 10px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.join-button{
  background-color: navy;
  color: black;
  font-weight: 700;
  border-radius: 5px;
  padding: 10px;
  font-size: large;
  text-decoration: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.join-button-li:hover
{
  filter: brightness(0.7); 
}


.button-link:hover, .join-button:hover, .post-button:hover {
  background-color: #555;
}

section {
  width: 58%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

li {
  background-color: lightblue;
  color: navy;
  border: 2px solid navy;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Specific container styling for inputs and text areas */
.input-container, .textarea-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, textarea {
  border-radius: 5px;
  padding: 10px;
  border: 2px solid #bbb;
  width: 100%;
  box-sizing: border-box;
}

h2, h5 {
  color: navy;
  margin: 0;
}
</style>
