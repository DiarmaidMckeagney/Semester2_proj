<template>
  <div>
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#signupform">
      Sign-Up
    </button>
  </div>
  <div class="modal fade" id="signupform" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title" id="exampleModalLabel"> Create Account </h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div class="modal-body">
            <div class="form-group">
              <label for="email">Email address</label>
              <input v-model="email" type="email" class="form-control" id="emailinit" aria-describedby="emailHelp"
                placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">Your information is safe with us.</small>
            </div>
            <div class="form-group">
              <label for="passwordinitial">Password</label>
              <input type="password" class="form-control" id="passwordinit" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="passwordConfirm">Confirm Password</label>
              <input v-model="password" type="password" class="form-control" id="password2"
                placeholder="Confirm Password">
            </div>
            <div class="form-group">
              <label for="username1">Username</label>
              <input v-model="username" type="text" class="form-control" id="username1" aria-describedby="usernameHelp"
                placeholder="Enter username">
            </div>
            <div class="modal-footer border-top-0 d-flex justify-content-center">
              <button type="button" class="btn btn-success" data-target="#profileModal" data-toggle="modal"
                data-dismiss="modal">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title" id="exampleModalLabel"> Profile details </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div class="modal-body">
            <div class="form-group">
              <label for="Age">Age</label>
              <input v-model="age" type="text" class="form-control" id="ageLabel" aria-describedby="NameHelp" placeholder="Enter Age">
            </div>
            <div class="form-group">
              <label for="Dob">Date of Birth</label>
              <input v-model="dob" type="text" class="form-control" id="Dob" placeholder="dd/mm/yyyy">
            </div>
          </div>
          <div class="modal-footer border-top-0 d-flex justify-content-center">
            <button @click="signUp" type="button" data-dismiss="modal" class="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
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
      updateProfile(user,{displayName: this.username}).then(() => {
        console.log("set username");
      });
    },
    /*createFriends(){
      const functions = getFunctions(app);
      const friendsList = httpsCallable(functions, 'startFriendList');
      const auth = getAuth();
      const user = auth.currentUser;

      friendsList({userId: user.uid}).then(() =>{
        console.log("finished");
      });
    }*/
  }
}
</script>