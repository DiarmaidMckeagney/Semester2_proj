<template>
  <footer class="footer" style="background-color: #121e67;" >
    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center justify-contert-lg-start align-items-center mb-md-0 mx-auto text-center fs-auto mt-auto">
      <li :class="{ 'active': $route.path === '/about' }">
        <router-link to="/about">About Us </router-link>
      </li> |
      <li :class="{ 'active': $route.path === '/cookie-policy' }">
        <router-link to="/cookie-policy">Cookie Policy</router-link>
      </li> |
      <li :class="{ 'active': $route.path === '/terms-of-use' }">
        <router-link to="/terms-of-use">Terms of Use</router-link>
      </li>
  </ul>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
};
</script>

<style scoped>
/* Style for footer links  style="background-color: #333; color: white; text-align: center; padding: 20px;"> */ 

.footer a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
  
}

.footer a:hover {
  text-decoration: underline;
}

.active {
  /* Add your active styles here */
  color: #12674a; /* Example text color for the active link */
  font-weight: bold;
  text-decoration: underline;
  
  
}
</style>
