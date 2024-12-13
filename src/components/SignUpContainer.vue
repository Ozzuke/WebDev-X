<template>
    <div id="signup-wrapper">
        <div class="signup-container">
            <h2>Sign Up</h2>
            <form @submit.prevent="onSignup">
                <div class="input-group">
                    <label for="username">Username</label>
                    <input v-model="name" type="text" id="username" name="username" required placeholder="Username" />
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" id="password" name="password" required
                        placeholder="Password" />
                </div>
                <button type="submit" class="btn-signup">Sign Up</button>
            </form>
            <div class="login-link">
                <p>
                    Already have an account?
                    <RouterLink to="/login">Login</RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "SignupContainer",
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        onSignup() {
            const errors = [];

            if (this.password.length < 8) {
                errors.push("Password must be at least 8 characters long.");
            }
            if (!/[A-Z]/.test(this.password)) {
                errors.push("Password must contain at least one uppercase letter.");
            }
            if (!((this.password.match(/[a-z]/g) || []).length >= 2)) {
            errors.push("Password must contain at least two lowercase letters.");
            }
            if (!/[0-9]/.test(this.password)) {
            errors.push("Password must contain at least one number.");
            }
            if (!/^[A-Z]/.test(this.password)) {
                errors.push("Password must start with an uppercase alphabet.");
            }
            if (!/_/.test(this.password)) {
                errors.push("Password must contain the character '_'.");
            }

            if (errors.length > 0) {
                alert("Password is not valid:\n" + errors.join("\n"));
                return;
            }

            // Perform signup logic here

            console.log("Username:", this.username);
            console.log("Password:", this.password);

            // Example redirect after signup
            this.$router.push("/");
        },
    },
};
</script>
  
<style scoped>
#signup-wrapper {
    
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}

.signup-container {
    max-height: fit-content;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    max-width: 90%;
    margin: 5vw auto;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    flex-grow: 1;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
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

.btn-signup {
    width: 100%;
    padding: 10px;
    background-color: #343a8f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-signup:hover {
    background-color: #45a049;
}

.login-link {
    margin-top: 15px;
}

.highlight {
    color: #11cfbc;
    text-decoration: none;
}

.highlight:hover {
    text-decoration: underline;
}
</style>
  
