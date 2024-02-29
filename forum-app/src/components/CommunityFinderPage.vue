
For the "Community Finder" page, if you wish to have a header similar to other pages, centered and without additional decorative shapes, here's the updated code:

vue
Copy code
<template>
  <div id="community-finder-page">

    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Community Search and Details Section -->
      <section style="width: 70%; padding: 10px;">
        <!-- Search Bar -->
        <div style="background-color: #f0f0f0; margin-bottom: 20px; padding: 20px;">Search Bar Placeholder</div>
        <ul v-for="n in communities.length">
          <!-- List of Communities -->
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
              <span>{{ communities[n-1] }}</span>
              <Router-link to = "/Community"><button class="join-button" style="background-color: #333; color: white;">Join</button></Router-link>
            </li>
        </ul>
      </section>

      <!-- Tag Search and List Section -->
      <aside style="width: 28%; background-color: #ddd; padding: 10px;">
        <div>
          <h2>Tag Search</h2>
          <div>Tag Search Placeholder</div>
        </div>
        <div style="margin-top: 20px;">
          <h2>Tag List</h2>
          <div>Tag List Placeholder</div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";


export default {
  data() {
    return {
      communities:[]
    }
  },
  created() {
    this.communityNames();
  },
  methods: {
    communityNames() {
      const functions = getFunctions(app);
      const communityNames = httpsCallable(functions, 'communityNames');
      communityNames().then((result) => {
        console.log(result);
        this.communities = result.data;
      })
    },
  }
}

</script>

<style scoped>
/* Scoped CSS styles go here */
</style>
<script setup>
</script>
