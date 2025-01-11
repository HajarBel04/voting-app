<template>
  <div>
    <DashNavbar />
    <router-view />
  </div>
</template>

<script>
import DashNavbar from "./components/DashNavbar.vue";
import { auth } from "./firebase";

export default {
  components: { DashNavbar },
  async created() {
    // Wait for Firebase to initialize and check the authentication state
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe(); // Unsubscribe after the first call
        resolve(user);
      });
    });
  },
};
</script>