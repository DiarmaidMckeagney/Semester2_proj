<template>
  <div id="signup-form">
      <form @submit.prevent="signUp">
            <div class="form-group">
                <label for="signupUsername">Username</label>
                <input v-model="signupUsername" type="text" class="form-control" id="signupUsername" aria-describedby="usernameHelp"
                    placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="signupEmail">Email address</label>
                <input v-model="signupEmail" type="email" class="form-control" id="signupEmail" aria-describedby="emailHelp"
                    placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">Your information is safe with us.</small>
            </div>
            <div class="form-group">
                <label for="signupPassword">Password</label>
                <input v-model="signupPassword" type="password" class="form-control" id="signupPassword" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="signupConfirmPassword">Confirm Password</label>
                <input v-model="signupConfirmPassword" type="password" class="form-control" id="signupConfirmPassword"
                    placeholder="Confirm Password">
            </div>
            <div class="form-group">
              <label for="Age">Age</label>
              <input v-model="age" type="text" class="form-control" id="ageLabel" aria-describedby="NameHelp" placeholder="Enter Age">
            </div>
            <div class="form-group">
              <label for="Dob">Date of Birth</label>
              <input v-model="dob" type="date" class="form-control" id="Dob" placeholder="dd/mm/yyyy">
            </div>
            <div class="modal-footer border-top-0 d-flex justify-content-center mt-2">
                <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
  </div>

</template>



<style scoped>
/* Style for the navigation bar {name: 'about', params: {message: 'Hi there' }} */
.navbar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  box-sizing: border-box;
}

@media (max-width: 576px) {
  .btn {
    font-size: 12px;
    padding: 4px 8px;
  }
}

/* Style for the dropdown menu */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Style for the dropdown button */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}


.modal-title{
  color: black;
}
/* Style for the dropdown content */
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Style for links within the dropdown, stacked vertically */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Style for hover effect on links */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* Display the dropdown content when hovering over the dropdown button */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
<script>
import app from "../api/firebase"
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import {getFunctions, httpsCallable} from "firebase/functions";


export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      age: "",
      dob: ""
    }
  },
  methods: {
    signUp() {
      console.debug(this.email);
      console.debug(this.password);
      console.debug(this.username);
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.createFriends();
        this.createProfile();
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
// ..
      });
    },
    createProfile(){
      const functions = getFunctions(app);
      const createProfile = httpsCallable(functions, 'createProfile');
      const auth = getAuth();
      const user = auth.currentUser;
      createProfile({ Uid: user.uid, username: this.username, age: this.age, dob: this.dob }).then(() => {
        console.log("finished");
      });
    },
    createFriends(){
      const functions = getFunctions(app);
      const friendsList = httpsCallable(functions, 'startFriendList');
      const auth = getAuth();
      const user = auth.currentUser;
      updateProfile(user,{displayName: this.username}).then(() => {
        console.log("set username");
      });
      friendsList({userId: user.uid}).then(() =>{
        console.log("finished");
      });
    }
  }
}
</script>