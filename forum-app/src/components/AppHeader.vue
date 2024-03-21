<template>
  <header class="app-header p-3">

    <!-- Logo Section -->
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start" :key="refresher">
       
          <a href="/" class="flex-width align-items-center mb-3 mb-lg-0 text-white text-decoration-none">
            <img src="@/assets/AlumnPSD-Back.png" alt="Site Logo" class="logo img-fluid" href="/" width="200px"/>
          </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center align-items-center mb-md-0 mx-auto text-center fs-4">
          <li :class="{ 'active': $route.path === '/' }">
            <router-link to="/" class="nav-link px-2 text-white ">Home</router-link>
           </li>
          <li :class="{ 'active': $route.path === '/community-finder' } ">
            <router-link to="/community-finder" class="nav-link px-2 text-white">Community Finder</router-link>
          </li>
          <li :class="{ 'active': $route.path === '/topics' }">
            <router-link to="/topics" class="nav-link px-2 text-white">Topics</router-link>
          </li>
          <li :class="{ 'active': $route.path === '/chatrooms' }">
            <router-link to="/chatrooms" class="nav-link px-2 text-white">Chatrooms</router-link>
          </li>
          <li :class="{ 'active': $route.path === '/quiz' }">
            <router-link to="/quiz" class="nav-link px-2 text-white">Quiz</router-link>
          </li>
        </ul>

        <div v-if="!userLoggedIn" class="d-flex">
          <LoginForm/>
          <SignUpForm/>
        </div>  
          <div v-else class="dropdown">
          <img src="@/assets/AlumnPSD-LogoOnly.png" alt="Default Icon"  class="img-fluid dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" style="max-width: 90px; height: auto; text-align: center;"> 
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li  :class="{ 'currHere': $route.path === '/profile' }">
              <a class="dropdown-item"> <router-link to= "/profile" class="nav-link px-2">Profile</router-link> </a>
            </li>
            <li  :class="{ 'currHere': $route.path === '/friend-messages' }">
              <a class="dropdown-item"> <router-link to= "/friend-messages" class="nav-link px-2">Friends</router-link> </a>
            </li>
            <li :class="{ 'currHere': $route.path === '/' }">
              <a class="dropdown-item"> <router-link to= "/" class="nav-link px-2" @click="logout">Logout </router-link> </a>
            </li>
          </ul>
          </div>
        </div>
      </div>
  </header>
</template>

<script>
import NavigationMenu from './NavigationMenu.vue';

import SignUpForm from './SignUpForm.vue';
import LoginForm from './LoginForm.vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


export default {
  
  props: ['TogglePopup'],

  data() {
    return {
      userLoggedIn: false,
      user: null,
      userDisplayName: null
    };
  },
  components: {
    NavigationMenu,
    SignUpForm,
    LoginForm
  },
  methods: {

    logout() {
      const auth = getAuth();

      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('User signed out');
          // Optionally, you can perform additional actions here, such as redirecting the user to a login page.
           // No user is signed in
          this.userLoggedIn = false;
          this.user = null;
          this.userDisplayName = user.displayName;
        })
        .catch((error) => {
          // An error happened.
          console.error('Sign-out error:', error);
        });
    }
  },
  
  created() {
    const auth = getAuth();

    // Check user authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        this.userLoggedIn = true;
        this.user = user; // Set the user data
        this.userDisplayName = user.displayName;
      } else {
        // No user is signed in
        this.userLoggedIn = false;
        this.user = null;
        this.userDisplayName = user.displayName;
      }
    });

  data() {
    return{
      refresher: 0,
      isLoggedIn: false
    }
  }
};
</script>

<style scoped>
.app-header {
  background-color: #7b5740 ; /* Match TheFooter background color */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.img-fluid:hover {
        filter: brightness(0.7); /* Darkens the image on hover */
    }


.active {
  /* Add your active styles here */
  background-color: #12674a; 
  color: #12674a; /* Example text color for the active link */
  border-radius: 15%; /* Make the background circular */
  padding: auto;

}
/*
.currHere {
  /* Add your active styles here 

}

.currHere:hover {
        filter: brightness(0.7); /* Darkens the image on hover 
    }
    */
@media (max-width: 768px) {
  .btn {
    padding: 8px 16px; /* Adjust the padding for smaller screens */
  }
  
}

.logo-section .logo {
  width: 30% ; /* Adjust as needed */
}

.menu-section {
  display: flex;
  justify-content: flex-end;
}

/* Style the navigation links to match the footer's text color */
.menu-section a {
  color: white;
  text-decoration: none;
}

.menu-section a:hover {
  text-decoration: underline;
}
</style>