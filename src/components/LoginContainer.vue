<template>
  <div id="login-wrapper">
    <div class="login-container">
      <h2>Login</h2>
      <h3 class="highlight">Welcome Back</h3>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input  v-model="email" id="email" type="text" placeholder="Enter email" required/>
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input  v-model="password" id="password" type="password" placeholder="Enter password" required/>
        </div>
        <button type="submit" class="btn-login">Login</button>
      </form>
      <div class="SignUp-link">
        <p>
          Don't have an account?
          <RouterLink to="/signup">Sign Up</RouterLink>
        </p>
      </div>
      <p class="Forget-password">Forgot your password?</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LoginContainer",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      await this.login({ email: this.email, password: this.password });
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.SignUp-link {
  text-align: center;
  margin-top: 10px;
}

#login-wrapper {
  min-height: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

.login-container {
  max-height: fit-content;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  margin: 5vw 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

.highlight {
  color: #11cfbc;
}

h3 {
  text-align: center;
  margin-bottom: 10px;
}

.input-group {
  margin-bottom: 15px;
  text-align: center;
}

.input-group input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-group input::placeholder {
  color: #999;
  opacity: 1;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #343a8f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #45a049;
}

.Forget-password {
  text-align: center;
  margin-top: 10px;
  color: #11cfbc;
}
</style>
