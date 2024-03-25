<template>
  <div id="community-page">
    <!-- Main Content Section -->
    <main>
      <!-- Sidebar: List of Users Joined -->
      <aside class="sidebar">
        <router-link to="/community-finder" class="button-link">Back to Community Finder</router-link>
        <ul v-for="n in communities.length" :key="refresher">
          <!-- List of Communities -->
          <li>
            <span></span>
            <button class="join-button" @click="refreshCommunity(communities[n-1])">{{ communities[n-1] }}</button>
          </li>
        </ul>
      </aside>

      <!-- Community Posts -->
      <section>
        <ul v-for="n in posts.length" :key="refresher">
          <li>
            <h2>{{ posts[n-1].title }}</h2>
            <h5>{{ posts[n-1].username }}</h5>
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
import {getAuth} from "firebase/auth";

export default {
  setup() {
    const communityNamestore = useCommunityName();
    return { communityNamestore };
  },

  data() {
    return {
      communities: [],
      posts: [],
      refresher: 0,
      title: "",
      mainBodyOfText: "",
      selectedCommunity: null, // Track the selected community
    };
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

.button-link, .join-button, .post-button {
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
