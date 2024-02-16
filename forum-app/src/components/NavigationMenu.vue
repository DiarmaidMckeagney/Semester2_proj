<template>
  <nav class="navbar">
    <!-- Dropdown Menu -->
    <div class="dropdown">
      <button class="dropbtn">Menu</button>
      <div class="dropdown-content">
        <router-link to="/login">Register/Log in</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/friend-messages">Friends</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/post">Posts</router-link>
        <router-link to="/community-finder">Community Finder</router-link>
        <router-link to="/community">Community</router-link>
        <router-link to="/topics">Topics</router-link>
        <router-link to="/quiz">Quiz</router-link> <!-- New link for Quiz Page -->
        <router-link to="/chatrooms">Chatrooms</router-link>
        <router-link to="/mod-tools">Mod Tools</router-link>
        <router-link to="/registration">Sign Up</router-link>
      </div>
    </div>
  </nav>
</template>


<script>
import { useHeaderStore } from '@/stores/header.js';


export default {
  methods: {
    updateNameInStore(newName)
    {
        const headerStore = useHeaderStore();
        headerStore.updateHeaderName(newName);

    },
  },

  
  name: 'NavigationMenu'
};
</script>

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
