<template>
  <div id="app">
    <!-- Header component included at the top, so it appears on all pages -->
    <AppHeader />

    <main>
      <router-view></router-view>
    </main>
    <!-- Footer component included at the bottom, so it appears on all pages -->
    <TheFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'; // Import the Header component
import TheFooter from './components/TheFooter.vue'; // Import the Footer component

export default {
  components: {
    AppHeader,// Register the Header component
    TheFooter
  }
};
</script>

<style scoped>
/* Your global CSS styles can go here */

footer {
  background-color: #333; /* Set your desired background color */
  padding: 20px;
  text-align: center;
  width: 100%;
  margin-top: auto; /* Push the footer to the bottom */
  position: fixed;
  bottom: 0;
  left: 0;
}
/* CONSIDER THIS
main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
*/

</style>
