<template>
  <div>
    <!-- Trigger Button -->
    <button type="button" class="btn btn-secondary" @click="showModal = true">
      Edit Profile
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="modal show" tabindex="-1" role="dialog" style="display: block;" aria-labelledby="editProfileModalLabel" aria-modal="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
            <button type="button" class="close" @click="showModal = false" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="updateProfile">
            <div class="modal-body">
              <div class="form-group">
                <label for="profileName">Name</label>
                <input type="text" class="form-control" id="profileName" v-model="name">
              </div>
              <div class="form-group">
                <label for="profileAge">Age</label>
                <input type="number" class="form-control" id="profileAge" v-model="age">
              </div>
              <div class="form-group">
                <label for="profileDob">Date of Birth</label>
                <input type="date" class="form-control" id="profileDob" v-model="dateOfBirth">
              </div>
              <!-- Additional new fields as per your screenshot -->
              <div class="form-group">
                <label for="hobbies">Hobbies</label>
                <input type="text" class="form-control" id="hobbies" v-model="hobbies">
              </div>
              <div class="form-group">
                <label for="favoriteAuthors">Favorite Authors</label>
                <input type="text" class="form-control" id="favoriteAuthors" v-model="favoriteAuthors">
              </div>
              <div class="form-group">
                <label for="favoriteMovies">Favorite Movies</label>
                <input type="text" class="form-control" id="favoriteMovies" v-model="favoriteMovies">
              </div>
              <!-- Add other fields from the screenshot here -->
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal Backdrop -->
    <div v-if="showModal" class="modal-backdrop show" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #000; opacity: 0.5;"></div>
  </div>
</template>
<script>
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from '../api/firebase';

export default {
  name: 'EditProfileModal',
  data() {
    return {
      showModal: false,
      name: '',
      age: '',
      dateOfBirth: '',
      hobbies: '',
      favoriteAuthors: '',
      favoriteMovies: '',
      // Initialize other fields here
    };
  },
  methods: {
    updateProfile() {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (user) {
        const functions = getFunctions(app);
        const userInfo = httpsCallable(functions, 'userInfo');
        userInfo({Uid: user.uid}).then((result) => {
          this.name = result.data.name;
          this.dateOfBirth = result.data.dateOfBirth;
          this.age = result.data.age;
        });
      } else {
        this.router.push({path: '/login'});
      }
    }
  }
}

</script>

<style scoped>
/* Your styles here */
</style>
