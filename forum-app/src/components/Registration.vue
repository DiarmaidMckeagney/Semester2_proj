<script>
import app from "../api/firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  name: "Registration",
  data(){
    return {
      email: "",
      password:""
    }
  },
  methods : {
    register(){
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
// Signed in
            const user = userCredential.user;
            console.log(user)
// ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
// ..
          });
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with
        anyone else.</small></div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" v-model="password" class="form-control"
             id="exampleInputPassword1" placeholder="Password">
    </div>
    <button @click="register" class="btn btn-primary">Create Account</button>
  </div>
</template>

<style scoped>

</style>