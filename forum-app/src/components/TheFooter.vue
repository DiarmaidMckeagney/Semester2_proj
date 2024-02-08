<template>
  <footer class="footer" >
<<<<<<< Updated upstream
    <router-link to="/support">Support</router-link> |
    <router-link to="/privacy-policy">Privacy Policy</router-link> |
    <router-link to="/cookie-policy">Cookie Policy</router-link> |
    <router-link to="/terms-of-use">Terms of Use</router-link>
=======
    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center align-items-center mb-md-0 mx-auto text-center fs-auto">
      <li :class="{ 'active': $route.path === '/support' }">
        <router-link to="/support">Support</router-link>
      </li> |
      <li :class="{ 'active': $route.path === '/privacy-policy' }">
        <router-link to="/privacy-policy">Privacy Policy</router-link> 
      </li> |
      <li :class="{ 'active': $route.path === '/cookie-policy' }">
        <router-link to="/cookie-policy">Cookie Policy</router-link>
    </li> |
    <li :class="{ 'active': $route.path === '/terms-of-use' }">
      <router-link to="/terms-of-use">Terms of Use</router-link>
    </li>
    
     
    
  </ul>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

.active {
  /* Add your active styles here */
  color: #ffffff; /* Example text color for the active link */
  font-weight: bold;
  text-decoration: underline;
  
  
}
>>>>>>> Stashed changes
</style>
