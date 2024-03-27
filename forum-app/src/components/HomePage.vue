<template>
  <div id="home-page" class="container-fluid">
    <!-- Main Content Section -->
    <main class="row" style="margin-top: 20px">
      <!-- Topics List Section -->
      <aside v-if="userLoggedIn" class="col-md-3 users-section d-flex flex-column align-items-center" style="padding: 2vh; min-height: 91vh; width: 33%">
        <h1 style="font-size: 3vw; margin-left: 10px; justify-content: center">Communities</h1>
        <ul v-for="n in communities.length" style="list-style: none;">
          <li style="font-size: 1.5vw; margin-bottom: 4px; justify-content: center">{{ JSON.parse(JSON.stringify(communities[n-1])) }}</li>
        </ul>
      </aside>

      <section class="col-md-6  d-flex flex-column justify-content-between" style="width: 66%">
        <div  v-if="userLoggedIn" class="form-group text-center users-section"  style="margin-bottom: 20px; padding: 20px; font-size: 20px; font-weight: bold; ">
          <img src="@/assets/AlumnPSD-Back.png" alt="Site Logo"  class="img-fluid dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" style="max-width: 500px; height: auto; text-align: center;">
          <p style="font-size: 40px">You are successfully logged in! <br> Enjoy your stay! </p>
        </div>
      </section>

      <section class="col-md-6  d-flex flex-column justify-content-between" style="width: 66%">
        <div  v-if="userLoggedIn" class="form-group text-center users-section"  style="margin-bottom: 20px; padding: 20px;">
          <ul v-for="n in posts.length" :key="refresher">
            <li>
              <h2>{{ JSON.parse(JSON.stringify(posts[n-1].title)) }}</h2>
              <h5>{{ JSON.parse(JSON.stringify(posts[n-1].username)) }}</h5>
              <span>{{ JSON.parse(JSON.stringify(posts[n-1].mainText)) }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="col-md-8  d-flex flex-column justify-content-between">
        <div  v-if="!userLoggedIn" class="form-group text-center users-section"  style="margin-bottom: 20px; padding: 20px; min-height: 91vh; font-size: 20px; font-weight: bold; ">
          <img src="@/assets/AlumnPSD-Back.png" alt="Site Logo"  class="img-fluid dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" style="max-width: 500px; height: auto; text-align: center;"> 
          <p style="font-size: 40px">Welcome to Alumn student forum</p>
        
          <h3 style="font-weight: bold;">Our Mission:</h3>
        <p>At Alumn, our mission is to create an engaging online space for students to connect, share knowledge, and grow. Our platform showcases the transformative power of technology in fostering community and learning.</p>

        <h3 style="font-weight: bold;">What We Offer:</h3>
        <p>We offer a variety of features: real-time chat for instant communication, customizable profiles to reflect individual identities and interests, 
          diverse chat rooms for different topics and study groups, interactive 
          quizzes for learning and fun, and a forum for diverse discussions and engagement.</p>

          <h3  style="font-weight: bold;">Join Our Community:</h3>
        <p>We invite you to be part of our community. As we progress with this exciting project, 
          your participation, ideas, and feedback are crucial in shaping a vibrant and inclusive student community.</p>
        </div>
      </section>

      <aside v-if="!userLoggedIn" class="col-md-4">
        <!-- Sign up Section -->
        <div class="users-section" style="padding: 1vh; margin-bottom: 1vh; min-height: 45vh;" >
          <div class="form-group text-center"> 
          <h2>Sign up</h2> 
         </div>
          <SignUpFormMain/>
        </div>
        <!-- Login Section -->
        <div v-if="!userLoggedIn"  class="users-section" style="padding: 1vh;  margin-bottom: 1vh; min-height: 45vh; ">
          <div class="form-group text-center"> 
          <h2>Login</h2> 
         </div>
           <LoginFormMain/>
        </div>
      </aside>

     
    </main>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import LoginFormMain from './LoginFormMain.vue';
import SignUpFormMain from './SignUpFormMain.vue';
import {getFunctions, httpsCallable} from "firebase/functions";
import app from "@/api/firebase.js";
export default {
  data() {
    return {
      communities: [],
      userLoggedIn: false,
      email: "",
      password: "",
      username: "",
      age: "",
      dob: "",
      posts: [],
      refresher: 0
    };
  },
  created() {
    const auth = getAuth();
    this.recentCommunityPosts();
    this.communityNames();
    // Check user authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        this.userLoggedIn = true;
      } else {
        // No user is signed in
        this.userLoggedIn = false;
      }
    });
  },
  components: {
    LoginFormMain,
    SignUpFormMain
  },
  methods: {
    recentCommunityPosts(){
      const functions = getFunctions(app);
      const recentCommunityPosts = httpsCallable(functions, 'mostRecentCommunityPosts');
      recentCommunityPosts().then((result) => {
        this.posts = result.data;
        console.log(this.posts);
      });
    },
    communityNames() {
      const functions = getFunctions(app);
      const communityNames = httpsCallable(functions, 'communityNames');
      communityNames().then((result) => {
        this.communities = result.data;
        console.log(this.communities);
      });
    }
  }
}
</script>
<style scoped>
#home-page {
  min-height: 100vh;
  background-color: #ffffe0;
}


.users-section {
  padding: 20px;
  background-color: lightblue; /* Slight contrast to main chat area */
  border:2px solid navy;
  border-radius: 10px;
  overflow-y: auto; /* For scrolling if many users */
}
</style>