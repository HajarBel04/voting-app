<template>
  <div class="min-h-screen flex">
    <!-- Left Section -->
    <div class="w-1/2 bg-gradient-to-br from-indigo-50 to-indigo-100 flex flex-col justify-center items-center text-center p-12">
      <img
        src="@/assets/logo.jpg"
        alt="Voting App Illustration"
        class="mb-8 w-64 h-auto"
      />
      <h1 class="text-5xl font-extrabold text-gray-800 mb-6">
        Make Your Voice Count!
      </h1>
      <p class="text-xl text-gray-600 max-w-md">
        Join our platform to participate in exciting events and cast your vote for the best decisions. Shape the future with your opinion!
      </p>
    </div>

    <!-- Right Section (Login Form) -->
    <div class="w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Welcome Back</h1>
            <p class="mt-2 text-gray-600">Sign in to continue to VoteX</p>
          </div>
          
          <form @submit.prevent="login" class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                v-model="email"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email(@um6p.ma)"
                required
              />
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                v-model="password"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            @click="signInWithGoogle"
            class="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" class="w-5 h-5 mr-3" />
            <span class="text-gray-700 font-medium">Google</span>
          </button>

          <p class="text-center text-gray-600">
            Don't have an account?
            <router-link to="/register" class="text-indigo-500 hover:text-indigo-600 font-medium">
              Sign up
            </router-link>
          </p>

          <div v-if="error" class="p-4 bg-red-50 rounded-xl text-red-500 text-center text-sm">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/dashboard");
      } catch (error) {
        this.error = error.message;
      }
    },
    async signInWithGoogle() {
      this.error = "";
      try {
        await signInWithPopup(auth, googleProvider);
        this.$router.push("/dashboard");
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>