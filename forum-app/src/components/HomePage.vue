<template>
  <div id="home-page">
    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Topics List Section -->
      <aside v-if="userLoggedIn" style="width: 20%; background-color: #ddd; padding: 10px;">
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

      <section style="width: 58%; padding: 10px;">
        <div style="background-color: #f0f0f0; margin-bottom: 20px; padding: 20px; height: 600px; font-size: 20px; font-weight: bold;">Welcome to Alumn student forum</div>
        <div style="background-color: #ffffe0; margin-bottom: 20px; padding: 20px;">Post 2 Content</div>
        <div style="background-color: #ffffe0; padding: 20px;">Post 3 Content</div>
      </section>

      <!-- Search Section -->
      <aside v-if="userLoggedIn" style="width: 20%; background-color: #ddd; padding: 10px;">
        <p>Search</p>
        <!-- Add search functionality here -->
      </aside>
    </main>

    <!-- Footer Section -->
    <footer>
      <p v-if="userLoggedIn">You are currently logged in.</p>
      <p v-else>You are not logged in.</p>
    </footer>
  </div>
</template>

<script>
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
  }
};
</script>

<style scoped>
#home-page {
  min-height: 80vh;
  background-color: #ffffe0;
}
</style>C
