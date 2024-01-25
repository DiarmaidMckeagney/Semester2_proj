<template>
  <div id="quiz-page">
    <!-- Header Section -->
    <div class="quiz-header" style="display: flex; justify-content: center; padding: 20px; background-color: #333;">
      <h1 style="color: white;">Quiz</h1>
    </div>

    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-around; padding: 20px;">
      <!-- Question List Section -->
      <aside style="width: 25%; background-color: #ddd; padding: 20px;">
        <h2>Questions</h2>
        <!-- Placeholder for questions list -->
      </aside>

      <!-- Quiz Question Section -->
      <section style="width: 70%; padding: 20px;">
        <div style="background-color: #f0f0f0; padding: 20px; margin-bottom: 10px;">
          <h3>Question</h3>
          <!-- Placeholder for question -->
        </div>
        <div style="background-color: #f0f0f0; padding: 20px;">
          <h3>Answer Options/Input Box</h3>
          <!-- Placeholder for answer options/input box -->
        </div>
      </section>
    </main>

  </div>
</template>

<script>
export default {
  name: 'QuizPage'
};
</script>

<style scoped>
/* Add your CSS here */
.create-quiz-header h2 {
  margin-top: 0;
}
</style>
