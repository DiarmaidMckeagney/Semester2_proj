<template>
  <footer class="footer" >
    <router-link to="/support">Support</router-link> |
    <router-link to="/privacy-policy">Privacy Policy</router-link> |
    <router-link to="/cookie-policy">Cookie Policy</router-link> |
    <router-link to="/terms-of-use">Terms of Use</router-link>
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
</style>
