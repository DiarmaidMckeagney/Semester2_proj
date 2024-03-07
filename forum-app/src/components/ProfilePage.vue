<template>
  <div id="profile-page">
    <main style="display: flex; padding: 20px;">
      <div style="width: 70%; margin-right: 20px;">
        <section style="background-color: #f0f0f0; padding: 20px;">
          <div style="display: flex; gap: 20px; align-items: flex-start;">
            <div style="width: 100px; height: 100px; background-color: #ccc; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #333;">
              Profile Photo
            </div>
            <div>
              <!-- Replaced the standalone button with EditProfileModal component -->
              <edit-profile-modal :user="{name: name, age: age, dateOfBirth: dateOfBirth}" @update="handleUpdate"></edit-profile-modal>
              <div class="mb-3">
                <h3>Hardcoded User Information</h3>
                <ul>
                  <li>Name: John Doe</li>
                  <li>Age: 32</li>
                  <li>Date of Birth: 1990-01-01</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section style="background-color: #f0f0f0; padding: 20px; margin-top: 20px;">
          <div>Recent posts and in what community</div>
          <div class="mb-3 right">
            <button type="button" @click="userInfo" class="btn btn-primary">Show Comments</button>
          </div>
        </section>
      </div>

      <aside style="width: 30%; background-color: #ddd; padding: 20px;">
        <div style="margin-bottom: 20px;">communities</div>
        <div style="margin-bottom: 20px;">friends</div>
        <div>Community list and Friend list in different tabs of this are</div>
      </aside>
    </main>
  </div>
</template>

<script>
import app from '../api/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
import EditProfileModal from './EditProfileModal.vue'; // Ensure this path is correct

export default {
  name: "Users",
  components: {
    EditProfileModal
  },
  data() {
    return {
      name: "",
      dateOfBirth: "",
      age: ""
    }
  },
  methods:{
    userInfo() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const functions = getFunctions(app);
        const userInfo = httpsCallable(functions,'userInfo');
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
/* Add your CSS here, and replace inline styles when you're ready */
</style>
