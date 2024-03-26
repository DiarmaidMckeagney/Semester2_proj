<template>
  <div id="home-page" class="container-fluid">
    <!-- Main Content Section -->
    <main class="row" style="margin-top: 20px">
      <!-- Topics List Section -->
      <aside v-if="userLoggedIn" class="col-md-3 users-section" style="padding: 2vh; min-height: 91vh; ">
        <h2>Topics List </h2>
        <ul>
          <!-- Direct topic links -->
          <li>
            <router-link to="/topic/1">Topic 1</router-link>
          </li>
          <li>
            <router-link to="/topic/2">Topic 2</router-link>
          </li>
          <li>
            <router-link to="/topic/3">Topic 3</router-link>
          </li>
        </ul>
      </aside>

      <section class="col-md-6  d-flex flex-column justify-content-between">
        <div  v-if="userLoggedIn" class="form-group text-center users-section"  style="margin-bottom: 20px; padding: 20px; font-size: 20px; font-weight: bold; ">
          <img src="@/assets/AlumnPSD-Back.png" alt="Site Logo"  class="img-fluid dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" style="max-width: 500px; height: auto; text-align: center;"> 
          <p style="font-size: 40px">You are successfully logged in! <br> Enjoy your stay! </p>
          </div>
        </section>
         <!-- Search Section -->
      <aside v-if="userLoggedIn" class="col-md-3 users-section" style="min-height: 91vh; padding: 10px;">
      <p>Search</p>
      <!-- Add search functionality here -->
      </aside>
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
export default {
  data() {
    return {
      userLoggedIn: false,
      email: "",
      password: "",
      username: "",
      age: "",
      dob: ""
    };
  },
  created() {
    const auth = getAuth();
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
    signUp() {
      console.debug(this.email);
      console.debug(this.password);
      console.debug(this.username);
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.createFriends();
        this.createProfile();
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
// ..
      });
    },
    login() {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(user);
      }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
    },
    createProfile(){
      const functions = getFunctions(app);
      const createProfile = httpsCallable(functions, 'createProfile');
      const auth = getAuth();
      const user = auth.currentUser;
      createProfile({ Uid: user.uid, username: this.username, age: this.age, dob: this.dob }).then(() => {
        console.log("finished");
      });
    },
    createFriends(){
      const functions = getFunctions(app);
      const friendsList = httpsCallable(functions, 'startFriendList');
      const auth = getAuth();
      const user = auth.currentUser;
      updateProfile(user,{displayName: this.username}).then(() => {
        console.log("set username");
      });
      friendsList({userId: user.uid}).then(() =>{
        console.log("finished");
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