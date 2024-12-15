<script>
import {generateName} from "@/utils/nameGenerator";

export default {
  name: "Header",
  mounted() {
    const userIcon = document.getElementById('user-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');

    userIcon.addEventListener('click', function () {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function (event) {
      if (!event.target.matches('#user-icon')) {
        if (dropdownMenu.style.display === 'block') {
          dropdownMenu.style.display = 'none';
        }
      }
    });
  },
  computed: {
    userName() {
      return generateName();
    }
  },
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (e) {
        console.error('Error logging out:', e);
      }
    }
  }
}
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/add-post">Add Post</RouterLink></li>
        <li><RouterLink to="/signup">Sign Up</RouterLink></li>
        <li><RouterLink to="/contact">Contact us</RouterLink></li>
      </ul>
    </nav>
    <div class="user-icon-container">
      <img src="../assets/images/default-user-icon.svg" alt="User icon" id="user-icon">
      <div id="dropdown-menu" class="dropdown-menu">
        <div class="user-info">
          <p id="user-name">{{ userName.fullName }}</p>
          <p id="user-email">{{ userName.email }}</p>
        </div>
        <RouterLink to="/login" @click="handleLogout">
          Logout
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 100;
}

nav > ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 2vw;
  display: flex;
}

nav ul li {
  margin-right: 10px;
}

nav ul li + li {
  padding-left: 10px;
  border-left: solid black 2px;
}

nav ul li a {
  font-family: monospace;
  text-decoration: none;
  color: #222;
  font-size: 1.6em;
  padding: 5px;
}

nav ul li a:hover {
  color: #444;
  text-decoration: underline;
  background-color: #ddd;
  border-radius: 15%;
}

nav ul li a:active {
  color: #30c9c9;
  text-decoration: underline;
}

header img {
  width: 64px;
  height: 64px;
  display: inline;
  -webkit-user-drag: none;
}

header img:hover {
  cursor: pointer;
  animation: rotate 20s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
    animation-timing-function: ease-in;
  }
  90% {
    transform: rotate(calc(360deg * 9));
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(3000px);
    animation-timing-function: ease-in;
  }
}

.user-info {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
}

.user-info p {
  margin: 0;
  padding: 4px 0;
  color: #333;
  font-size: 0.9em;
}

.user-icon-container {
  position: relative;
}

#dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 200px;
  display: none;
  z-index: 1000;
  padding: 10px;
}

#dropdown-menu a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #222;
}

#dropdown-menu a:hover {
  background-color: #f0f0f0;
}
</style>
