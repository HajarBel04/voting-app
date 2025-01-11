<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Create Account</h1>
          <p class="mt-2 text-gray-600">Join VoteX</p>
        </div>
        
        <form @submit.prevent="register" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="email"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="example@um6p.ma"
              required
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Choose a password"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <p class="text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-indigo-500 hover:text-indigo-600 font-medium">
            Sign in
          </router-link>
        </p>

        <div v-if="error" class="p-4 bg-red-50 rounded-xl text-red-500 text-center text-sm">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase"; // Import auth from your firebase.js file
import { fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth"; // Correct import

export default {
  name: "UserRegister",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      this.error = "";

      // Check if the email ends with "@um6p.ma"
      if (!this.email.endsWith("@um6p.ma")) {
        this.error = "Please use your university email (@um6p.ma)";
        return;
      }

      // Check if the email is already in use
      try {
        const methods = await fetchSignInMethodsForEmail(auth, this.email);
        if (methods.length > 0) {
          this.error = "This email is already registered. Please log in instead.";
          this.$router.push("/login");
          return;
        }
      } catch (error) {
        this.error = "Error checking email. Please try again.";
        return;
      }

      // Attempt to create a new account
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/dashboard");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          this.error = "This email is already registered. Please log in instead.";
          this.$router.push("/login");
        } else {
          this.error = error.message;
        }
      }
    },
  },
};
</script>