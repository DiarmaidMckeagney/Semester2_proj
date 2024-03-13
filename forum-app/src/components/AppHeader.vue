<template>
  <header class="app-header p-3">

    <!-- Logo Section -->
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
<!-- 
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="942" height="443" role="img" aria-label="Bootstrap"><use xlink:href="#alumn"></use></svg>
        </a>

         
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="200" height="32" role="img" aria-label="Bootstrap">
            <image href="@/assets/AlumnPSD-Back.png" width="100%" height="100%"/>
          </svg>
        </a> The idea here was to make it resizable but it just doesnt work ?--> 
       
          <a href="/" class="flex-width align-items-center mb-3 mb-lg-0 text-white text-decoration-none">
            <img src="@/assets/AlumnPSD-Back.png" alt="Site Logo" class="logo img-fluid" href="/" width="200px"/>
          </a>
   
      

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center align-items-center mb-md-0 mx-auto text-center fs-4">
          <li :class="{ 'active': $route.path === '/' }">
            <router-link to="/" class="nav-link px-2 text-white ">Home</router-link>
           </li>

          <li  :class="{ 'active': $route.path === '/about' }">
            <router-link to="/about" class="nav-link px-2 text-white">About</router-link>
          </li>
<<<<<<< Updated upstream
          <li :class="{ 'active': $route.path === '/community-finder' }">
            <router-link to="/community-finder" class="nav-link px-2 text-white">Communities</router-link>
=======
          <li :class="{ 'active': $route.path === '/community-finder' } ">
            <router-link to="/community-finder" class="nav-link px-2 text-white">Community Finder</router-link>
>>>>>>> Stashed changes
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

        <div class="d-flex">
          <LoginForm/>
          <SignUpForm/>
        </div>  
      </div>
    </div>
  </header>
</template>

<script>
import NavigationMenu from './NavigationMenu.vue';

import SignUpForm from './SignUpForm.vue';
import LoginForm from './LoginForm.vue';


export default {
  
  props: ['TogglePopup'],

  components: {
    NavigationMenu,
    SignUpForm,
    LoginForm
  }
  //Props are no longer needed since we pass nothing into the header
  //props: {
   // message: String,
 // },
  
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



.active {
  /* Add your active styles here */
  background-color: #12674a; /* Example background color for the active link */
  color: #12674a; /* Example text color for the active link */
  border-radius: 15%; /* Make the background circular */
  padding: auto;

}

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