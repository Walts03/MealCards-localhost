<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" :src="logo" alt="Your Company" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email address</label
            >
            <div class="mt-1">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <div class="mt-1">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <p v-if="loginError" class="text-red-500 text-center mt-2">
          {{ loginError }}
        </p>
      </div>
      <p class="mt-2 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link
          to="/signup"
          class="font-medium text-lime-600 hover:text-lime-500"
          >Sign up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logo from "../assets/logo.png";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loginError: "", // To display login errors
      logo,
    };
  },
  methods: {
    async login() {
      try {
        // First, check if there is a user with the given email
        const usersResponse = await axios.get(
          `http://localhost:3000/users?email=${this.email}`
        );
        if (usersResponse.data.length === 0) {
          // If no user is found with that email, set an error message
          this.loginError = "Email does not exist.";
        } else {
          // If a user is found, check the password
          const user = usersResponse.data[0]; // Assuming the first match is the user
          if (user.password === this.password) {
            // If the password matches, proceed to log the user in
            localStorage.setItem("user-info", JSON.stringify(user));
            this.$router.push({ name: "home" });
          } else {
            // If the password does not match, set an error message
            this.loginError = "Wrong password.";
          }
        }
      } catch (error) {
        this.loginError =
          "An error occurred during the login process. Please try again later.";
        console.error("Login error:", error);
      }
    },
  },
};
</script>
