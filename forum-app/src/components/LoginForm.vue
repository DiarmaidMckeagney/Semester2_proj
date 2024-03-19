<template>

<modal class="SignUp">

  <button type="button" class="btn btn-outline-light me-2 " data-toggle="modal" data-target="#loginform">
    Login
  </button>  


<div class="modal fade" id="loginform" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header border-bottom-0">
        <h5 class="modal-title" id="exampleModalLabel"> Login </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form>
        <div class="modal-body">
          <div class="form-group">
            <label for="email1">Email address</label>
            <input type="emailUsername" class="form-control" id="emailUsername1" aria-describedby="emailHelp" placeholder="Enter email or username">
          </div>
          <form>
            <div class="modal-body">
              <div class="form-group">
                <label for="email1">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email1" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="password1">Password</label>
                <input v-model="password" type="password" class="form-control" id="password1" placeholder="Password">
              </div>
            </div>
            <div class="modal-footer border-top-0 d-flex justify-content-center">
              <button @click="login" type="button" data-dismiss="modal" class="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
        </form>
      </div>
    </div>
</div>
  </modal>
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

@media (max-width: 576px) {
  .btn {
    font-size: 12px;
    padding: 4px 8px;
  }
}
</style>
<script>
import app from "../api/firebase"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";


export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(user);
      }).catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
    }
  }
}
</script>