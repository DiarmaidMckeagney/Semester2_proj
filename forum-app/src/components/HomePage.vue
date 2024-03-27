<template>
  <div id="home-page" class="container-fluid">
    <!-- Main Content Section -->
    <main class="row" style="margin-top: 20px">
      <!-- Topics List Section -->
<<<<<<< Updated upstream
      <aside v-if="userLoggedIn" class="col-md-3" style="background-color: #ddd; padding: 2vh;">
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

=======
      <aside v-if="userLoggedIn" class="col-md-3 users-section d-flex flex-column align-items-center" style="padding: 2vh; min-height: 91vh;">
        <h1 style="font-size: 3vw; margin-left: 10px; justify-content: center">Communities</h1>
        <ul v-for="n in communities.length" style="list-style: none;">
          <li style="font-size: 1.5vw; margin-bottom: 4px; justify-content: center" @click="moveToCommunity(communities[n-1])">{{ JSON.parse(JSON.stringify(communities[n-1])) }}</li>
        </ul>
      </aside>

      <section class="col-md-9 d-flex flex-column justify-content-between">
        <div  v-if="userLoggedIn" class="form-group text-center users-section"  style="margin-bottom: 20px; padding: 20px; font-size: 20px; font-weight: bold; ">
          <img src="@/assets/AlumnPSD-Back.png" alt="Site Logo"  class="img-fluid dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" style="max-width: 500px; height: auto; text-align: center;">
          <p style="font-size: 40px">You are successfully logged in! <br> Enjoy your stay! </p>
        </div>

          <ul v-for="n in posts.length" :key="refresher">
        <div  v-if="userLoggedIn" class="form-group text-center users-section"  style="margin-bottom: 20px; padding: 20px; font-size: 20px; font-weight: bold; ">
              <h2>{{ JSON.parse(JSON.stringify(posts[n-1].title)) }}</h2>
              <h5 @click="moveToProfile(posts[n-1].uid)">{{ JSON.parse(JSON.stringify(posts[n-1].username)) }}</h5>
              <span>{{ JSON.parse(JSON.stringify(posts[n-1].mainText)) }}</span>
          </div>
          </ul>
      </section>

>>>>>>> Stashed changes
      <section class="col-md-8  d-flex flex-column justify-content-between">
        <div style="background-color: #f0f0f0; margin-bottom: 20px; padding: 20px; min-height: 91vh; font-size: 20px; font-weight: bold; ">
          <img src="@/assets/AlumnPSD-LogoOnly.png" alt="Default Icon"  class="img-fluid dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" style="max-width: 90px; height: auto; text-align: center;"> 
          <p style="font-size: 40px">Welcome to Alumn student forum</p></div>
        <div class="d-none d-md-block" style="height: 45vh;"></div> <!-- Spacer for small devices -->
      </section>

      <aside class="col-md-4">
        <!-- Sign up Section -->
        <div v-if="!userLoggedIn" style="background-color: #ddd; padding: 1vh; margin-bottom: 1vh; min-height: 45vh;">
          <h2>Sign up</h2>
          <form>
          <div class="modal-body">
            <div class="form-group">
              <label for="username1">Username</label>
              <input v-model="username" type="text" class="form-control" id="username1" aria-describedby="usernameHelp"
                placeholder="Enter username">
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input v-model="email" type="email" class="form-control" id="emailinit" aria-describedby="emailHelp"
                placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">Your information is safe with us.</small>
            </div>
            <div class="form-group">
              <label for="passwordinitial">Password</label>
              <input type="password" class="form-control" id="passwordinit" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="passwordConfirm">Confirm Password</label>
              <input v-model="password" type="password" class="form-control" id="password2"
                placeholder="Confirm Password">
            </div>
            <div class="modal-footer border-top-0 d-flex justify-content-center">
              <button type="button"  @click="signUp" class="btn btn-success" data-target="#profileModal" data-toggle="modal"
                data-dismiss="modal">Submit</button>
            </div>
          </div>
        </form>
        </div>
        <!-- Login Section -->
        <div v-if="!userLoggedIn" style="background-color: #ddd; padding: 1vh;  margin-bottom: 1vh; min-height: 45vh;">
          <h2>Login</h2>
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <form>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="email1">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="email1" aria-describedby="emailHelp" placeholder="Enter email">
                  </div>
                  <div class="form-group">
                    <label for="password1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password1" placeholder="Password">
                  </div>
                </div>
                <div class="modal-footer border-top-0 d-flex justify-content-center">
                  <button @click="login" type="button" class="btn btn-success">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </aside>

      <!-- Search Section -->
      <aside v-if="userLoggedIn" class="col-md-3" style="background-color: #ddd; padding: 10px;">
        <p>Search</p>
        <!-- Add search functionality here -->
      </aside>
    </main>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

main {
  flex: 1; /* Allow the main content section to grow and fill remaining space */
}

</style>
