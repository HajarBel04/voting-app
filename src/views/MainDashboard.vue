<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-12 text-center text-gray-800 tracking-tight">
        Welcome to VoteX
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Card 1: Explore Events -->
        <router-link
          to="/dashboard/all-events"
          class="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 transform group-hover:scale-95 transition-transform duration-300"></div>
          <div class="relative flex flex-col items-center text-center space-y-4">
            <GlobeAltIcon class="h-16 w-16 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 class="text-2xl font-bold text-gray-800">Explore Events</h2>
            <p class="text-gray-600 max-w-sm">Discover exciting events and vote for your favorites. Make your voice heard!</p>
            <span class="inline-flex items-center text-blue-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
              Start Exploring
              <ArrowRightIcon class="h-4 w-4 ml-2" />
            </span>
          </div>
        </router-link>

        <!-- Card 2: Host an Event -->
        <router-link
          to="/dashboard/add-event"
          class="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 transform group-hover:scale-95 transition-transform duration-300"></div>
          <div class="relative flex flex-col items-center text-center space-y-4">
            <MicrophoneIcon class="h-16 w-16 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
            <h2 class="text-2xl font-bold text-gray-800">Host an Event</h2>
            <p class="text-gray-600 max-w-sm">Create your own event and let the community decide its fate.</p>
            <span class="inline-flex items-center text-emerald-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
              Get Started
              <ArrowRightIcon class="h-4 w-4 ml-2" />
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { GlobeAltIcon, MicrophoneIcon } from "@heroicons/vue/24/outline";

export default {
  name: "MainDashboard",
  components: { GlobeAltIcon, MicrophoneIcon },
};
</script>