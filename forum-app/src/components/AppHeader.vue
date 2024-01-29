<template>
  <header class="app-header">
    <!-- Logo Section -->
    <div class="logo-section">
      <img src="@/assets/AlumnPSD-LogoOnly.png" alt="Site Logo" class="logo" />
    </div>

    <div class="home-header" style="text-align: center; background-color: #333; padding: 20px;">
      <h1 style="color: white;">{{ message }}</h1>
    </div>

    <!-- Navigation Menu -->
    <div class="menu-section">
      <NavigationMenu />
    </div>
  </header>
</template>

<script>
import NavigationMenu from './NavigationMenu.vue';

export default {
  components: {
    NavigationMenu
  },
  props: {
    message: String,
  },
  
}
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
