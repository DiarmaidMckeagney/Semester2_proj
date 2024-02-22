<template>
  <div id="profile-page">
    <!-- Main Content Section -->
    <main style="display: flex; padding: 20px;">
      <!-- Bio Section -->
      <section style="width: 70%; background-color: #f0f0f0; padding: 20px; margin-right: 20px;">
        <h2>Name and bio/details underneath</h2>
        <div>Recent posts and in what community</div>
        <div class="mb-3 right">
          <button type="button" @click="userInfo" class="btn btn-primary">Show Comments</button>
        </div>
        <div class="mb-3">
          <ul id="array-rendering">
            <li>
              {{ name }}
              {{ age }}
              {{ dateOfBirth }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Communities and Friends Tabs -->
      <aside style="width: 30%; background-color: #ddd; padding: 20px;">
        <div style="margin-bottom: 20px;">communities</div>
        <div style="margin-bottom: 20px;">friends</div>
        <div>Community list and Friend list in different tabs of this are</div>
      </aside>
    </main>

  </div>
</template>

<style scoped>
/* Add your CSS here, and replace inline styles when you're ready */
</style>

<script>
  import app from '../api/firebase';
  import { getFunctions, httpsCallable } from "firebase/functions";
  import { getAuth } from "firebase/auth";
  export default {
    name: "Users",
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
            console.log(result);
          });
        } else {
          this.router.push({path: '/login'});
        }

      }
    }
  }
</script>
