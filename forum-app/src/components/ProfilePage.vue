<script setup>
  defineProps({
    userID: String
  })
</script>


<template>
  <div id="profile-page">
    <main style="display: flex; padding: 20px;">
      <div style="width: 70%; margin-right: 20px;">
        <section :key="refresher" style="background-color: #f0f0f0; padding: 20px;">
          <div style="display: flex; gap: 20px; align-items: flex-start;">
            <div  v-if="isHidden" class="d-flex justify-content-center align-items-center bg-light" style="width: 100px; height: 100px; background-color: #ccc; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #333;">
         
                <span v-if="finalUrl">  <img  :src="finalUrl"  alt="Custom Icon" style="width: 100px; height: 100px;"> </span>
                <span v-else> <i>  <img  src="@/assets/AlumnPSD-LogoOnly.png" alt="Default Icon" style="width: 100px; height: 100px; text-align: center;"> </i></span> <!--Put whatever u want in the src here-->
               
            </div>

            <div  v-if="!isHidden" class="d-flex justify-content-center align-items-center bg-light" style="width: 100px; height: 100px; background-color: #ccc; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #333;">
              <label for="fileInput">   
                <span v-if="imageUrl">  <img  :src="imageUrl"  alt="Custom Icon" style="width: 100px; height: 100px;"> </span>
                <span v-else> <i>  <img  src="" alt="Select an Image" style="width: 100px; height: 100px; text-align: center; cursor: pointer;">  </i></span> 
              </label>
              <input id="fileInput" type="file" @change="onFileSelected" style="display: none;">
            </div>
          
            <div> 
              <div class="mb-3" v-if="isHidden">
                <h3>{{JSON.parse(JSON.stringify(profileInfo[0].username))}}</h3>
                <div class="mb-3 d-flex flex-column">
                  
                  <label class="mb-3 me-3"><b class="me-3" >Age:</b> 
                       <span v-if="JSON.parse(JSON.stringify(profileInfo[0].age))">{{ JSON.parse(JSON.stringify(profileInfo[0].age)) }}</span>
                       <span v-else> <i> Not set</i></span>
                  </label>

                  <label class="mb-3"> <b class="me-3" >Date of Birth:</b>
                       <span v-if="JSON.parse(JSON.stringify(profileInfo[0].dob))">{{ JSON.parse(JSON.stringify(profileInfo[0].dob)) }}</span>
                       <span v-else> <i> Not set</i></span>
                  </label>
                </div>
              </div>
              
              
              <div v-if="isHidden" class="d-flex justify-content-end" style="align-items: end; ">
                <img src="@/assets/editPencil.png"  @click="toggleVisibility" style="cursor: pointer"  alt="Site Logo" class="logo img-fluid" href="/" width="80px"/>
               <button @click="toggleVisibility"  class="btn btn-sm ms-auto" style="background-color: #00FFFF"> Edit</button>
             </div>

             
            <div class="mb-3" v-if="!isHidden">
              <h3>Edit Profile</h3>
              <form @submit.prevent="submitForm">
                <div class="mb- d-flex flex-column">

                <div class="mb-3 d-flex align-items-center ">
                  <label for="name" class="form-label me-3 " ><b>Name:</b></label>
                  <input type="text" id="name" v-model="formData.name" class="form-control" required>
                </div>

                <div class="mb-3 d-flex align-items-center ">
                  <label for="age" class="form-label me-3"><b>Age</b></label>
                  <input type="number" id="age" v-model="formData.age" class="form-control" required>
                </div>

                <div class="mb-3 d-flex align-items-center " >
                  <label for="dateOfBirth" class="form-label me-3" ><b>Date of Birth</b></label>
                  <input type="date" id="dateOfBirth" v-model="formData.dateOfBirth" style="width: 100" class="form-control" required>
                </div>
                <div v-if="!isHidden" style="align-items: end;">
                <button @click="toggleVisibility"  class="btn me-3" style="background-color: red"> Cancel</button>
                <button type="submit"   @click="submitForm"  class="btn btn-primary">Save Changes</button>
                </div>
                
                </div>
            </form>  
           
          
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
import { toRaw } from 'vue';

export default {
  name: "Users",
  components: {
    EditProfileModal
  },
  data() {
    return {
      formData: {
        name: "",
        dateOfBirth: "",
        age: ""
      },
      isHidden: true,
      selectedFile: null,
      imageUrl: null,
      finalUrl: null,
      profileInfo:[],
      refresher: 0
    }
  },
  created() {
    this.userInfo();
  },
  methods:{
    toggleVisibility() {
      this.isHidden = !this.isHidden;  // Toggle visibility
    },
    onFileSelected(event){
      console.log(event);
      this.selectedFile = event.target.files[0]; //grabs first file uploaded
      this.loadImage();
    },
    loadImage() {
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
    submitForm() {
      // Update the actual data properties with the form data
      this.name = this.formData.name;
      this.dateOfBirth = this.formData.dateOfBirth;
      this.age = this.formData.age;
      // hide the form after submission
      this.isHidden = true;
      this.finalUrl = this.imageUrl;
    },
    userInfo() {
      const functions = getFunctions(app);
      const userInfo = httpsCallable(functions, 'userInfo');

      userInfo({ Uid: "B8MTbCHWw7YfjvrHIfwVb1fbv7p1" }).then((result) => {
        console.log(result);
        let result1 = result;
        this.profileInfo = result.data;
      });
      this.refresher++;
    },
    add_Friend(){
      const functions = getFunctions(app);
      const addFriend = httpsCallable(functions, 'newFriend');
      const auth = getAuth();
      const user = auth.currentUser;
      addFriend({userId: user.uid, friendId: this.userID}).then(() => {
          console.log("finished")
      });
    }
  }
}



</script>

<style scoped>
/* Add your CSS here, and replace inline styles when you're ready */
</style>
