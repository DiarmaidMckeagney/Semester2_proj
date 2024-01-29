<template>
  <div id="home-page">
    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Topics List Section -->
      <aside style="width: 20%; background-color: #ddd; padding: 10px;">
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

      <!-- Posts Section -->
      <section style="width: 58%; padding: 10px;">
        <div style="background-color: #f0f0f0; margin-bottom: 20px; padding: 20px;">Post 1 Content</div>
        <div style="background-color: #f0f0f0; padding: 20px;">Post 2 Content</div>
      </section>

      <!-- Search Section -->
      <aside style="width: 20%; background-color: #ddd; padding: 10px;">
        <p>Search</p>
        <!-- Add search functionality here -->
      </aside>
    </main>

    <!-- Footer Section -->
  </div>
</template>

<style scoped>
/* Add your CSS here */
</style>

<script>
import AppHeader from './AppHeader.vue';

export default {

  components: {
   AppHeader
  }
}

</script>
