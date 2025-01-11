<template>
  <nav v-if="showNavbar" class="bg-indigo-600 text-white p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/dashboard" class="text-xl font-bold flex items-center">
        <HomeIcon class="h-6 w-6 mr-2" />
        Dashboard
      </router-link>
      <div class="flex space-x-4">
        <!-- Show My Events and Logout if authenticated -->
        <template v-if="isAuthenticated">
          <router-link to="/dashboard/my-events" class="hover:text-indigo-300 flex items-center">
            <CalendarIcon class="h-6 w-6 mr-2" />
            My Events
          </router-link>
          <button
            @click="logout"
            class="hover:text-indigo-300 flex items-center"
          >
            <ArrowLeftOnRectangleIcon class="h-6 w-6 mr-2" />
            Logout
          </button>
        </template>
        <!-- Show Login if not authenticated -->
        <router-link v-else to="/login" class="hover:text-indigo-300 flex items-center">
          <ArrowLeftOnRectangleIcon class="h-6 w-6 mr-2" />
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { HomeIcon, CalendarIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline";

export default {
  name: "DashNavbar",
  components: { HomeIcon, CalendarIcon, ArrowLeftOnRectangleIcon },
  data() {
    return {
      isAuthenticated: false,
      showNavbar: true, // Controls whether the navbar is shown
    };
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        this.$router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    checkRoute() {
      // Hide navbar on login and register pages
      const hideRoutes = ["/login", "/register"];
      this.showNavbar = !hideRoutes.includes(this.$route.path);
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.isAuthenticated = !!user;
    });
    this.checkRoute();
  },
  watch: {
    // Watch for route changes and update navbar visibility
    $route() {
      this.checkRoute();
    },
  },
};
</script>