<template>
  <div id="quiz-page">
    <!-- Main Content Section -->
    <main style="display: flex; justify-content: space-around; padding: 20px;">
      <!-- Category Selection Section -->
      <aside style="width: 25%; background-color: #ddd; padding: 20px;">
        <h2>Categories</h2>
        <div style="display: flex; flex-direction: column;">
          <button class="category-button" @click="setCategory('generalKnowledge')">General Knowledge</button>
          <button class="category-button" @click="setCategory('computerScience')">Computer Science</button>
          <button class="category-button" @click="setCategory('history')">History</button>
          <button class="category-button" @click="setCategory('geography')">Geography</button>
          <!-- Add more buttons for other quiz categories -->
        </div>
      </aside>

      <!-- Quiz Question Section -->
      <section style="width: 70%; padding: 20px;">
        <!-- Grey Box -->
        <div style="background-color: #f0f0f0; padding: 20px; margin-bottom: 10px;" v-if="!currentCategory">
          <h3>Please select a category to start the quiz.</h3>
        </div>

        <!-- Actual Quiz Content -->
        <div v-else style="background-color: #f0f0f0; padding: 20px; margin-bottom: 10px;">
          <h3>{{ questions[currentCategory][currentQuestion].questionText }}</h3>
          <ul>
            <li v-for="option in questions[currentCategory][currentQuestion].options" :key="option">
              <button @click="selectAnswer(option)" style="width: 100%; padding: 5px;">
                {{ option }}
              </button>
            </li>
          </ul>
          <p v-if="answerFeedback !== null">{{ answerFeedback }}</p>
          <p>Total Score: {{ totalScore }}</p>
          <button @click="nextQuestion">Next Question</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'QuizPage',
  data() {
    return {
      currentCategory: null,
      currentQuestion: 0,
      answerFeedback: null,
      questions: {
        generalKnowledge: [
          { questionText: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Iron", "Quartz"], correctAnswer: "Diamond", score: 10 },
          { questionText: "Which country has the oldest continuously used national flag?", options: ["Denmark", "Japan", "United Kingdom", "France"], correctAnswer: "Denmark", score: 10 },
          { questionText: "What phenomenon explains the bending of light due to gravity?", options: ["Red Shift", "Quantum Entanglement", "Gravitational Lensing", "The Doppler Effect"], correctAnswer: "Gravitational Lensing", score: 10 },
          { questionText: "Which of these elements is not a noble gas?", options: ["Neon", "Radon", "Hydrogen", "Argon"], correctAnswer: "Hydrogen", score: 10 },
          { questionText: "The concept of \"Pangea\" is best associated with what?", options: ["Internet Infrastructure", "A phase in the development of early computing", "A supercontinent that existed during the late Paleozoic and early Mesozoic eras", "The theory of continental drift"], correctAnswer: "A supercontinent that existed during the late Paleozoic and early Mesozoic eras", score: 10 }
        ],
        computerScience: [
          { questionText: "What is Big O notation used for?", options: ["Estimating the worst-case runtime of an algorithm", "Calculating the space complexity of a program", "Measuring the size of a database", "Determining the user interface complexity"], correctAnswer: "Estimating the worst-case runtime of an algorithm", score: 10 },
          { questionText: "Which data structure uses a FIFO (First In, First Out) approach?", options: ["Array", "Stack", "Queue", "Tree"], correctAnswer: "Queue", score: 10 },
          { questionText: "In object-oriented programming, what does 'inheritance' allow?", options: ["A class to pass on its properties and methods to a subclass", "A function to operate in multiple threads", "A database to expand dynamically", "An algorithm to run faster"], correctAnswer: "A class to pass on its properties and methods to a subclass", score: 10 },
          { questionText: "What does the term \"API\" stand for?", options: ["Automated Programming Interface", "Application Programming Interface", "Advanced Peripheral Interface", "Application Peripheral Integration"], correctAnswer: "Application Programming Interface", score: 10 },
          { questionText: "Which sorting algorithm is considered the fastest in practice for small data sets?", options: ["Merge Sort", "Bubble Sort", "QuickSort", "Heap Sort"], correctAnswer: "QuickSort", score: 10 }
        ],
        history: [
          // Add history questions here
        ],
        geography: [
          // Add geography questions here
        ]
        // Add more categories here if needed
      }
    };
  },
  computed: {
    totalScore() {
      // Calculate total score based on the number of correct answers
      return this.questions[this.currentCategory]
          .reduce((total, question) => {
            if (question.correctAnswer === question.selectedAnswer) {
              return total + question.score;
            }
            return total;
          }, 0);
    }
  },
  methods: {
    setCategory(category) {
      this.currentCategory = category;
      this.currentQuestion = 0; // Reset to the first question of the selected category
      this.answerFeedback = null; // Reset answer feedback
    },
    selectAnswer(option) {
      // Update selected answer for the current question
      this.questions[this.currentCategory][this.currentQuestion].selectedAnswer = option;
      if (option === this.questions[this.currentCategory][this.currentQuestion].correctAnswer) {
        this.answerFeedback = "Correct!";
      } else {
        this.answerFeedback = "Incorrect!";
      }
    },
    nextQuestion() {
      if (this.currentQuestion < this.questions[this.currentCategory].length - 1) {
        this.currentQuestion++;
        this.answerFeedback = null; // Reset answer feedback for next question
      } else {
        this.answerFeedback = "End of quiz!";
        // Optionally reset or handle the end of quiz scenario
      }
    }
  }
};
</script>

<style scoped>
.category-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
}
</style>
