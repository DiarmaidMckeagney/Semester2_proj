<template>
  <div id="profile-page">
    <main style="display: flex; padding: 20px;">
      <div style="width: 70%; margin-right: 20px;">
        <section :key="refresher" style="background-color: #f0f0f0; padding: 20px;">
          <div style="display: flex; gap: 20px; align-items: flex-start;">
            <div v-if="isHidden" class="d-flex justify-content-center align-items-center bg-light"
              style="width: 100px; height: 100px; background-color: #ccc; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #333;">

              <span v-if="finalUrl"> <img :src="finalUrl" alt="Custom Icon" style="width: 100px; height: 100px;"></span>
              <span v-else> <i> <img src="@/assets/AlumnPSD-LogoOnly.png" alt="Default Icon" style="width: 100px; height: 100px; text-align: center;"> </i></span>
              <!--Put whatever u want in the src here-->
            </div>

            <div v-if="!isHidden" class="d-flex justify-content-center align-items-center bg-light" style="width: 100px; height: 100px; background-color: #ccc; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #333;">
              <label for="fileInput">
                <span v-if="imageUrl"> <img :src="imageUrl" alt="Custom Icon" style="width: 100px; height: 100px;">
                </span>
                <span v-else> <i> <img src="" alt="Select an Image" style="width: 100px; height: 100px; text-align: center; cursor: pointer;"> </i></span>
              </label>
              <input id="fileInput" type="file" @change="onFileSelected" style="display: none;">
            </div>

            <div>
              <div class="mb-3" v-if="isHidden">
                <h3>{{ JSON.parse(JSON.stringify(profileInfo[0].username)) }}</h3>
                <div class="mb-3 d-flex flex-column">

                  <label class="mb-3 me-3"><b class="me-3">Age:</b>
                    <span v-if="JSON.parse(JSON.stringify(profileInfo[0].age))">{{ JSON.parse(JSON.stringify(profileInfo[0].age)) }}</span>
                    <span v-else> <i> Not set</i></span>
                  </label>

                  <label class="mb-3"> <b class="me-3">Date of Birth:</b>
                    <span v-if="JSON.parse(JSON.stringify(profileInfo[0].dob))">{{ JSON.parse(JSON.stringify(profileInfo[0].dob)) }}</span>
                    <span v-else> <i> Not set</i></span>
                  </label>
                </div>
              </div>


              <div v-if="isHidden" class="d-flex justify-content-end" style="align-items: end; ">

                <img src="@/assets/editPencil.png" @click="toggleVisibility" style="cursor: pointer" alt="Site Logo" class="logo img-fluid" href="/" width="80px" />
                <button @click="toggleVisibility" class="btn btn-sm ms-auto" style="background-color: #00FFFF">Edit</button>
                <button v-if="this.id == this.currentUserId" @click="toggleVisibility" class="btn btn-sm ms-auto" style="background-color: #00FFFF">Edit</button>
                <button v-else class="btn btn-sm ms-auto" style="background-color: #00FFFF; " @click="add_Friend">Add as friend</button>

              </div>

              <div class="mb-3" v-if="!isHidden">
                <h3>Edit Profile</h3>
                <form @submit.prevent="submitForm">
                  <div class="mb- d-flex flex-column">

                    <div class="mb-3 d-flex align-items-center ">
                      <label for="name" class="form-label me-3 "><b>Name:</b></label>
                      <input type="text" id="name" v-model="formData.name" class="form-control" required>
                    </div>

                    <div class="mb-3 d-flex align-items-center ">
                      <label for="age" class="form-label me-3"><b>Age</b></label>
                      <input type="text" id="age" v-model="formData.age" class="form-control" required>
                    </div>

                    <div class="mb-3 d-flex align-items-center ">
                      <label for="dateOfBirth" class="form-label me-3"><b>Date of Birth</b></label>
                      <input type="text" id="dateOfBirth" v-model="formData.dateOfBirth" style="width: 100"
                        class="form-control" required>
                    </div>
                    <div v-if="!isHidden" style="align-items: end;">
                      <button @click="toggleVisibility" class="btn me-3" style="background-color: red"> Cancel</button>
                      <button type="submit" @click="submitForm" class="btn btn-primary">Save Changes</button>
                    </div>

                  </div>
                </form>


              </div>
            </div>

          </div>




        </section>


        <section style="background-color: #f0f0f0; padding: 20px; margin-top: 20px;">
          <div>
            <ul v-for="n in posts.length" :key="refresher" style="list-style-type:none;">
              <li style="position: relative; list-style: none; margin-bottom: 10px;">
                <div
                  style="position: relative; padding: 10px; background-color: #e6f2ff; border-radius: 10px; max-width: 80%; overflow: hidden;">
                  <strong>{{ posts[n - 1].username }}</strong>
                  <p>{{ posts[n-1].title }}</p>
                  <p>{{ posts[n-1].messageBody }}</p>
                </div>
                <div
                  style="position: absolute; top: 60px; left: -10px; width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 10px solid #e6f2ff;">
                </div>
              </li>
            </ul>
          </div>
          <div class="mb-3 right">
            <modal class="CreateChat">
              <div class="container">
                <button type="button" class="create-button" style="background-color: #333; color: white;" data-toggle="modal" data-target="#createForm">
                  New Post
                </button>
              </div>

              <div class="modal fade" id="createForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                      <h5 class="modal-title" id="exampleModalLabel"> Create New Chatroom </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form>
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="titleLabel">Title</label>
                          <input v-model="title" type="text" class="form-control" id="titleLabel" aria-describedby="NameHelp" placeholder="Enter Name">
                        </div>
                        <div class="form-group">
                          <label for="messageLabel">Message Body</label>
                          <input v-model="messageBody" type="text" class="form-control" id="bodyLabel" aria-describedby="NameHelp" placeholder="Enter Name">
                        </div>
                      </div>
                      <div class="modal-footer border-top-0 d-flex justify-content-center">
                        <button @click="sendMessage" type="button" data-dismiss="modal" class="btn btn-success">Post</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </modal>
          </div>
        </section>
      </div>



      <aside style="width: 30%; background-color: #ddd; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">Friends</div>
        <div :key="refresher">
          <ul v-for="n in friends.length" :key="refresher">
            <!-- List of Communities -->
            <li
              style="border: 1px solid #ccc; margin: auto ;padding: 10px;padding-left: 28%; background-color: #f0f0f0; list-style-type: none;">
              <button @click="moveToProfile(friends[n-1].id)">{{friends[n-1].name.name}}</button>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>

import app from '../api/firebase';
import {getFunctions, httpsCallable} from "firebase/functions";
import {getAuth} from "firebase/auth";
import EditProfileModal from './EditProfileModal.vue'; // Ensure this path is correct
import router from "@/router.js";
import {useUserId} from "@/stores/counter.js";

export default {
  name: "Users",
  components: {
    EditProfileModal
  },
  setup(){
    const userIdStore = useUserId();

    return { userIdStore }
  },
  data() {
    return {
      formData: {
        name: "",
        dateOfBirth: "",
        age: ""
      },
      id: "",
      isHidden: true,
      selectedFile: null,
      imageUrl: null,
      finalUrl: null,
      profileInfo: [],
      friends: [],
      posts: [],
      refresher: 0,
      title: "",
      messageBody: ""
      currentUserId: ""
    }
  },
  
  created() {
    this.userInfo();
    this.friendsNames();
    this.displayMessages();
    const auth = getAuth();
    const user = auth.currentUser;
    this.currentUserId = user.uid;

  },
  methods:{
    editProfileInfo(){
      const functions = getFunctions(app);
      const editProfileInfo = httpsCallable(functions, 'editProfileInfo');
      editProfileInfo({Uid: this.id,username: this.name, dob: this.dateOfBirth, age: this.age}).then((result) => {
        this.userInfo();
      });
    },
    displayMessages(){
      const functions = getFunctions(app);
      const chatroomMessages = httpsCallable(functions, 'profilePosts');
      chatroomMessages({Uid: this.id}).then((result) => {
        this.posts = result.data;
      });
      this.refresher++;
    },

    sendMessage(){
      const functions = getFunctions(app);
      const sendMessage = httpsCallable(functions, 'newProfilePost');
      const auth = getAuth();
      const user = auth.currentUser;
      sendMessage({Uid: this.id,username: user.displayName, messageBody: this.messageBody, title: this.title}).then((result) => {
        this.displayMessages();
      });
        this.messageBody = "";
      },
    addEmoji(emoji) {
        this.messageBody += emoji.native;
    },

    friendsNames() {
      const auth = getAuth();
      const user = auth.currentUser;
      if(user){
        const functions = getFunctions(app);
        const friendsNames = httpsCallable(functions, 'displayFriends');
        friendsNames({userId: this.id}).then((result) => {
        console.log(result);
        this.friends = result.data;
      })
      } else {
        this.friends[0] = "You must be logged in to view friends list";
      }    
      this.refresher++;
    },

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
      console.log(this.name);
      console.log(this.dateOfBirth);
      console.log(this.age);
      this.editProfileInfo();
    },
    userInfo() {
      const functions = getFunctions(app);
      const userInfo = httpsCallable(functions, 'userInfo');
      this.id = this.userIdStore.getUserId;

      userInfo({ Uid: this.id}).then((result) => {
        console.log(result);
        this.profileInfo = result.data;
        this.name = JSON.parse(JSON.stringify(this.profileInfo[0].username)) ;
      });
      this.refresher++;
    },
    add_Friend(){
      console.log(this.name);
      const functions = getFunctions(app);
      const addFriend = httpsCallable(functions, 'newFriend');
      const auth = getAuth();
      const user = auth.currentUser;
      addFriend({userId: user.uid, friendId: this.id, friendName: this.name, username: user.displayName}).then(() => {
          console.log("finished")
      });
    },
    moveToProfile(id){
      this.userIdStore.changeName(id);
      router.push({path: "/profile"});
    }
  }
}



</script>

<style scoped>
/* Add your CSS here, and replace inline styles when you're ready */
</style>
