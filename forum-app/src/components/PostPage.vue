<template>
  <div id="post-page">

    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-between; padding: 20px;">
      <!-- Tabs Section -->
      <aside style="width: 20%; background-color: #ddd; padding: 10px;">
        <h2>Tabs</h2>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px;">
            <router-link to="/quiz">Quiz</router-link> <!-- Link to Quiz Page -->
          </li>
          <li style="margin-bottom: 10px;">Homework</li>
          <li style="margin-bottom: 10px;">Exercises</li>
          <!-- Additional tabs here -->
        </ul>
      </aside>

      <!-- Post Creation Section -->
      <section style="width: 75%; padding: 10px;">
        <div style="background-color: #f0f0f0; margin-bottom: 20px; padding: 20px;">
          <h3>Post header/title</h3>
          <!-- Placeholder for post title input -->
        </div>
        <div style="background-color: #f0f0f0; margin-bottom: 20px; padding: 20px;">
          <h3>Post body</h3>
          <!-- Placeholder for post body input -->
        </div>
        <button style="padding: 10px;">Post</button>
      </section>
    </main>

    <!-- Footer Section -->
   
  </div>
</template>

<style scoped>
/* Add your CSS here */
</style>
