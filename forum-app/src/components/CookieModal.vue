<template>

  <div class="modal fade display-flex" id="cookieModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" style="position: fixed;">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title" id="exampleModalLabel"> Cookie Policy </h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form>
          <div class="modal-body">
           <p> This application uses cookies, if you want to learn more check out our <router-link to="/cookie-policy" data-dismiss="modal">Cookie Policy</router-link></p>
            <div class="modal-footer border-top-0 d-flex justify-content-center">
              <button type="button" class="btn btn-success" data-target="#profileModal" data-toggle="modal"
                data-dismiss="modal">Submit</button>
                <button type="button" class="btn btn-danger" data-target="#profileModal" data-toggle="modal"
                data-dismiss="modal">Reject</button>
            </div>
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
    
</script>