<template>
  <div id="app">
    <!-- Header component included at the top, so it appears on all pages -->
     <!-- Pass the TogglePopup function as a prop to Header.vue -->
    <AppHeader  v-if="userLoggedIn" :TogglePopup="() => TogglePopup('buttonTrigger')"/>

    <main style="background-color: beige;">
      <router-view></router-view>

    </main>
    <!-- Footer component included at the bottom, so it appears on all pages -->
    <TheFooter v-if="userLoggedIn" class="mt-auto" id="main-footer" />
  </div>


</template>
<script>
import AppHeader from './components/AppHeader.vue'; // Import the Header component
import TheFooter from './components/TheFooter.vue'; // Import the Footer component
//import { useHeaderStore } from '@/stores/header.js';
import Popup from './components/Popup.vue';
import { ref } from 'vue'; //importing references
import SignUpForm from './components/SignUpForm.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      userLoggedIn: false
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
  setup(){
    const popupTriggers = ref({
      buttonTrigger: false
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }
    return{
      popupTriggers,
      TogglePopup
    }
  },
  components: {
    AppHeader,// Register the Header component
    TheFooter,
    Popup,
    SignUpForm
  }
  //Header store is no longer needed since we use a button light up thing now
  //data() {
  //  return {
      //store: useHeaderStore(), //Tip - dont use data() and setup() in the same export default
     // Popup
  //  };
 // },
};
</script>
<style scoped>
footer {
  background-color: #333; /* Set your desired background color */
  padding: 20px;
  text-align: center;
  width: 100%;
  margin-top: auto; /* Push the footer to the bottom */
  position: static; /* Try syatic */
  bottom: 0;
  left: 0;
}
main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure at least the height of the viewport */
}
</style>