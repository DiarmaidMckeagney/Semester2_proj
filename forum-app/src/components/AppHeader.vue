<template>
  <header class="app-header">
    <!-- Logo Section -->
    <div class="logo-section">
      <img src="@/assets/AlumnPSD-LogoOnly.png" alt="Site Logo" class="logo" />
    </div>

    <div class="home-header" style="text-align: center; background-color: #333; padding: 20px;">
      <h1 style="color: white;">{{ message }}</h1>
    </div>

<<<<<<< Updated upstream
    <!-- Navigation Menu -->
    <div class="menu-section">
      <NavigationMenu />
=======
    <div class="container">

      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <div class="logo-section">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src="@/assets/AlumnPSD-LogoOnly.png" alt="Site Logo" class="logo" href="/"/>
          </a>

        </div>

        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center align-items-center mb-md-0 mx-auto text-center fs-4">
          <li :class="{ 'active': $route.path === '/' }">
            <router-link to="/" class="nav-link px-2 text-white ">Home</router-link>
           </li>

          <li  :class="{ 'active': $route.path === '/about' }">
            <router-link to="/about" class="nav-link px-2 text-white">About</router-link>
          </li>
          <li :class="{ 'active': $route.path === '/community-finder' }">
            <router-link to="/community-finder" class="nav-link px-2 text-white">Communities</router-link>
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
        
        <LoginForm/>
        <SignUpForm/>

            <!-- Navigation Menu -->
          <div class="menu-section">
            <NavigationMenu/>

          </div>
      </div>
>>>>>>> Stashed changes
    </div>
  </header>
</template>

<script>
import NavigationMenu from './NavigationMenu.vue';
<<<<<<< Updated upstream
=======
import SignUpForm from './SignUpForm.vue';
import LoginForm from './LoginForm.vue';
>>>>>>> Stashed changes

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
  background-color: #333; /* Match TheFooter background color */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo-section .logo {
  width: 100px ; /* Adjust as needed */
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
