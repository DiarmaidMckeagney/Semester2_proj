<template>

<modal class="SignUp">
  <div class="container">
  <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#signupform">
    Sign-Up
  </button>  
</div>

<div class="modal fade" id="signupform" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <label for="email1">Email address</label>
            <input type="email" class="form-control" id="email1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">Your information is safe with us.</small>
          </div>
          <div class="form-group">
            <label for="password1">Password</label>
            <input type="password" class="form-control" id="password1" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="password1">Confirm Password</label>
            <input type="password" class="form-control" id="password2" placeholder="Confirm Password">
          </div>
        </div>
        <div class="modal-footer border-top-0 d-flex justify-content-center">
          <button type="submit" class="btn btn-success">Submit</button>
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
</style>
