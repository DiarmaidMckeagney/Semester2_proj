<template>
  <div id="topics-page">

    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Create Topic Section -->
      <aside style="width: 28%; background-color: #ddd; padding: 10px;">
        <h2>Create New Topic</h2>
        <button class="create-button" style="background-color: #333; color: white;">Create</button>
      </aside>

      <!-- Topics List Section -->
      <section style="width: 65%; margin-right: 3%;">
        <h2>Topics List</h2>
        <ul>
          <!-- Static Links -->
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <router-link to="/topic/1">Sample Topic 1</router-link>
          </li>
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <router-link to="/topic/2">Sample Topic 2</router-link>
          </li>
          <li style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; background-color: #f0f0f0;">
            <router-link to="/topic/3">Sample Topic 3</router-link>
          </li>
        </ul>
      </section>

      <!-- Right Box -->
      <section style="width: 30%; background-color: #ddd; padding: 10px;">
        <!-- Content for the right box -->
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Add your CSS here */
</style>
