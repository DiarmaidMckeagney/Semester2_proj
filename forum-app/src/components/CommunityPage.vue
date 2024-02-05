<template>
  <div id="community-page">
    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Sidebar: List of Users Joined -->
      <aside style="width: 20%; background-color: #ddd; padding: 20px;">
        <h2>List of users joined communities</h2>
        <!-- Placeholder for list -->
      </aside>

      <!-- Community Posts -->
      <section style="width: 58%; padding: 20px;">
        <!-- Placeholder for Posts -->
        <div style="background-color: #f0f0f0; margin-bottom: 20px;">Post</div>
        <div style="background-color: #f0f0f0;">Post</div>
      </section>

      <!-- Right Sidebar for Actions like Create Community -->
      <aside style="width: 20%; background-color: #ddd; padding: 20px;">
        <router-link to="/community-finder" class="button-link">Community Finder</router-link>
        <button>Create Community</button>
      </aside>
    </main>

  </div>
</template>

<style scoped>
/* Add your CSS here */
.button-link {
  background-color: #333;
  color: white;
  padding: 10px;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 10px;
}
.button-link:hover {
  background-color: #555;
}
</style>
