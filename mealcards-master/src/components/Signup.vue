<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" :src="logo" alt="Your Company" />
      <h2
        class="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign Up your Account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Username</label
          >
          <div class="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              v-model="username"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              @input="checkUsername"
              :class="{ 'border-red-500': usernameError }"
              aria-describedby="username-error"
            />
            <p
              id="username-error"
              v-if="usernameError"
              class="mt-2 text-sm text-red-600"
            >
              {{ usernameError }}
            </p>
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900 mt-2"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              required
              autocomplete="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              @input="checkEmail"
              :class="{ 'border-red-500': emailError }"
              aria-describedby="email-error"
            />
            <p
              id="email-error"
              v-if="emailError"
              class="mt-2 text-sm text-red-600"
            >
              {{ emailError }}
            </p>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mt-2">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                <span v-show="showPassword">Hide</span>
                <span v-show="!showPassword">Show</span>
              </button>
            </div>
          </div>
          <div class="mt-2 relative">
            <input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              @input="checkPassword"
              :class="{ 'border-red-500': passwordError }"
              aria-describedby="password-error"
            />
            <p
              id="password-error"
              v-if="passwordError"
              class="mt-2 text-sm text-red-600"
            >
              {{ passwordError }}
            </p>
          </div>
        </div>

        <div class="mt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            @click="signup"
          >
            <span v-if="!loading">Sign Up</span>
            <span v-if="loading">Loading...</span>
          </button>
        </div>
      </div>
      <p class="mt-2 text-center text-sm text-gray-500">
        Already a member?
        <router-link
          to="/login"
          href="#"
          class="font-semibold leading-6 text-lime-600 hover:text-lime-500"
          >Sign In Here !</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logo from "../assets/logo.png";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      usernameError: "",
      emailError: "",
      passwordError: "",
      isEmailTaken: false,
      logo,
    };
  },
  methods: {
    validateInputs() {
      this.usernameError = this.username.trim()
        ? ""
        : "Username cannot be empty.";
      this.emailError = this.email.trim() ? "" : "Email cannot be empty.";
      this.passwordError = this.password.trim()
        ? ""
        : "Password cannot be empty.";
    },
    checkUsername() {
      this.usernameError = "";
      if (this.username.length < 3) {
        this.usernameError = "Username must be at least 3 characters long.";
      }
    },
    checkEmail() {
      if (!this.email) {
        this.emailError = "Email is required.";
        return;
      }
      const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = "Please enter a valid email address.";
        return;
      }
      // Query the json-server to find if any user with the same email exists
      axios
        .get(`http://localhost:3000/users?email=${this.email}`)
        .then((response) => {
          if (response.data.length > 0) {
            // Since json-server returns an array
            this.emailError = "This email is already taken.";
            this.isEmailTaken = true;
          } else {
            this.emailError = "";
            this.isEmailTaken = false;
          }
        })
        .catch((error) => {
          console.error("Error checking email:", error);
          this.emailError = "Failed to validate email due to server error.";
        });
    },

    checkPassword() {
      this.passwordError = "";
      if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters long.";
      }
    },
    signup() {
      this.validateInputs();
      if (
        this.usernameError ||
        this.emailError ||
        this.passwordError ||
        this.isEmailTaken
      ) {
        return; // Make sure form submission is stopped if any error exists
      }
      this.loading = true;
      axios
        .post("http://localhost:3000/users", {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then((result) => {
          if (result.status == 201) {
            localStorage.setItem("user-info", JSON.stringify(result.data));
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          console.error("Signup failed:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style scoped>
.border-red-500 {
  border-color: #f87171;
}
</style>
