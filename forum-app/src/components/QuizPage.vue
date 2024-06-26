<template>
  <div id="quiz-page">
    <!-- Category Selection -->
    <div v-if="!currentCategory" style="padding: 20px; text-align: center;">
      <h2 style="color:Navy; font-size: 38px; margin-top: 20px;margin-bottom: 20px;">
        Select Category
      </h2>
      <div class="category-button-container">
        <div class="category-box" v-for="category in categories" :key="category.id">
          <button style="color:navy;" @click="selectCategory(category.id)" class="category-button">
            <img :src="category.imageUrl" :alt="category.name" class="category-image">
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>


    <!-- Quiz Content -->
    <main v-else-if="currentQuestion" style="padding: 20px;color:navy; max-width: 800px; margin: 0 auto;">
      <!-- Dynamic Categories as buttons above the Quiz Content -->
      <div v-if="currentCategory" style="text-align: center;color:navy; margin-top: 10px;">
        <nav class="category-links">
          <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.id)"
              :class="{'selected-category': currentCategory === category.id}"
              class="category-nav-button">
            {{ category.name }}
          </button>
        </nav>
      </div>

      <section>
        <div style="background-color: lightblue; padding: 20px;color:navy; margin-bottom: 10px; border-radius: 20px; margin-top: 10px; max-width: 1500px; min-height: 300px; max-height: 600px; overflow: hidden;">
          <h2>{{ currentQuestion.questionText }}</h2>
          <div>
            <button
                v-for="option in [currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4]"
                :key="option"
                @click="selectAnswer(option)"
                :class="answerClass(option)"
                class="option-button">
              {{ option }}
            </button>
          </div>
          <p v-if="answerFeedback">{{ answerFeedback }}</p>
          <p>Total Score: {{ totalScore }}</p>
          <button v-if="showNextButton" style="border-radius: 20px;" @click="nextQuestion">Next Question</button>

        </div>
      </section>
    </main>
    <p v-else>Loading question...</p>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import app from '../api/firebase';

export default {
  name: 'QuizPage',
  setup() {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const currentCategory = ref(null);
    const currentQuestion = ref(null);
    const answerFeedback = ref('');
    const totalScore = ref(0);
    const selectedOption = ref('');
    const scoresByCategory = ref({}); // Object to store scores for each category
    const maxQuestions = 2; // Maximum number of questions
    const showNextButton = ref(true); // Variable to control the visibility of the "Next Question" button

    // Dynamically manage categories and their image URLs
    const categories = ref([
      { id: 'general', name: 'General Knowledge', imageUrl: 'QuizImages/general.jpg' },
      { id: 'history', name: 'History', imageUrl: 'QuizImages/history.jpg' },
      { id: 'biology', name: 'Biology', imageUrl: 'QuizImages/biology.jpg' },
      { id: 'computerScience', name: 'Computer Science', imageUrl: 'QuizImages/computerScience.jpg' },
      { id: 'geography', name: 'Geography', imageUrl: 'QuizImages/geography.jpg' },
      { id: 'chemistry', name: 'Chemistry', imageUrl: 'QuizImages/chemistry.jpg' },
      { id: 'software', name: 'Software Engineering', imageUrl: 'QuizImages/software.jpg' },
    ]);
    onMounted(async () => {
      // Dynamically fetch image URLs for each category
      for (const category of categories.value) {
        try {
          const imageUrl = await getDownloadURL(storageRef(storage, category.imageUrl));
          category.imageUrl = imageUrl; // Update the imageUrl property with the fetched URL
        } catch (error) {
          console.error(`Failed to fetch image URL for ${category.name}:`, error);
        }
      }
    });

    const selectCategory = async (category) => {
      if (currentCategory.value !== category) {
        // Reset the total score to zero
        totalScore.value = 0;
        // Reset the score for the current category
        scoresByCategory.value[currentCategory.value] = 0;
        currentCategory.value = category;
      }
      // Set showNextButton back to true
      showNextButton.value = true;
      await loadQuestion('question1');
    };

    const loadQuestion = async (questionId) => {
      const questionDocRef = doc(db, 'category', currentCategory.value, 'questions', questionId);
      const docSnap = await getDoc(questionDocRef);

      if (docSnap.exists()) {
        currentQuestion.value = { id: questionId, ...docSnap.data() };
        answerFeedback.value = '';
        selectedOption.value = '';
      } else {
        console.error("Question not found");
      }
    };

    const selectAnswer = (option) => {
      selectedOption.value = option;
      if (option === currentQuestion.value.answer) {
        answerFeedback.value = 'Correct!';
        // Increment the score for the current category
        scoresByCategory.value[currentCategory.value] = (scoresByCategory.value[currentCategory.value] || 0) + 10;
        // Update the totalScore to reflect the score for the current category
        totalScore.value = scoresByCategory.value[currentCategory.value];
      } else {
        answerFeedback.value = 'Incorrect!';
      }
    };

    const answerClass = (option) => ({
      'correct-answer': option === currentQuestion.value.answer && selectedOption.value === option,
      'incorrect-answer': selectedOption.value === option && currentQuestion.value.answer !== option,
    });

    const nextQuestion = async () => {
      let currentIdNumber = parseInt(currentQuestion.value.id.replace(/[^\d]/g, ''));
      if (currentIdNumber < maxQuestions) {
        const nextQuestionId = `question${currentIdNumber + 1}`;
        await loadQuestion(nextQuestionId);
        answerFeedback.value = '';
        selectedOption.value = '';
      } else {
        console.log("End of the quiz.");
        // Hide the "Next Question" button
        showNextButton.value = false;
      }
    };

    return {
      categories, // Include categories in the returned object
      currentCategory,
      currentQuestion,
      answerFeedback,
      totalScore,
      selectedOption,
      selectCategory,
      loadQuestion,
      selectAnswer,
      answerClass,
      nextQuestion,
      showNextButton // Expose the variable to the template
    };
  },
};
</script>


<style scoped>
#quiz-page {
  min-height: 70vh;
  background-color: beige;
}

#quiz-page > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color:navy;
}

.category-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 50px;
  color:navy;
  background-color: lightblue;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.category-box:hover {
  background-color: green;
}

.option-button {
  display: block;
  width: 100%;
  margin: 10px auto;
  padding: 15px 0;
  font-size: 18px;
  text-align: center;
  color: navy;
  background-color: #e7e7e7;
  border: 2px solid transparent;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.option-button:hover {
  background-color: #d0d0d0;
  border-color: #aaa;
}

.correct-answer {
  background-color: green !important;
  color: white;
}

.incorrect-answer {
  background-color: #f44336 !important;
  color: white;
}

h3 {
  text-align: center;
  color:navy;
}
.category-nav-button {
  margin: 0 5px 10px; /* Add bottom margin */
  padding: 10px 15px;
  background-color: lightblue;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  cursor: pointer;
  color:navy;
  transition: background-color 0.2s;
  width: 190px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-nav-button:hover {
  background-color: orange;
}

.selected-category {
  background-color: lightgreen; /* Green background */
  color: navy; /* White text for better contrast */
}

/*
.next-button {
 display: block;
 width: 100%;
 margin-top: 20px;
 padding: 15px 0;
 font-size: 18px;
 text-align: center;
 color: white;
 background-color: #007bff;
 border: none;
 border-radius: 20px;
 cursor: pointer;
 transition: background-color 0.2s;
}

.next-button:hover {
 background-color: #0056b3;
}
*/
.category-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-image {
  width: 140px;
  height: auto;
  margin-bottom: 10px;
  color:navy;
}
</style>