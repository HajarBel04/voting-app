<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
    <!-- Update this line to set the width to 60% -->
    <div class="w-[60%] mx-auto">
      <!-- All Events Section -->
      <div v-if="activeTab === 'allEvents'" class="space-y-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 tracking-tight">Events Board</h2>
            <span class="text-sm text-gray-500">Have your say on upcoming events</span>
          </div>

          <!-- Search Bar for "All Events" -->
          <div class="relative w-full md:w-1/3">
            <input
              v-model="searchQueryAll"
              type="text"
              placeholder="Search all events..."
              class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <MagnifyingGlassIcon
              class="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-6 mt-4">
          <div
            v-for="event in filteredEventsAll"
            :key="event.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <!-- Event Image (Full Width) -->
            <div class="relative w-full">
              <img
                v-if="event.image"
                :src="event.image"
                alt="Event Image"
                class="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <CalendarIcon class="h-12 w-12 text-blue-300" />
              </div>
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {{ new Date(event.date).toLocaleDateString() }}
              </div>
            </div>
            
            <!-- Event Details -->
            <div class="p-6 space-y-4">
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">{{ event.title }}</h3>
                <p class="text-gray-600 text-sm line-clamp-2">{{ event.description }}</p>
              </div>
              
              <div class="flex items-center text-sm text-gray-500">
                <UserIcon class="h-4 w-4 mr-2" />
                <span>{{ event.creatorEmail }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div class="text-center">
                  <p class="text-green-500 font-bold text-lg">{{ event.votes.yes }}</p>
                  <p class="text-xs text-gray-500">Yes votes</p>
                </div>
                <div class="h-8 w-px bg-gray-200"></div>
                <div class="text-center">
                  <p class="text-red-500 font-bold text-lg">{{ event.votes.no }}</p>
                  <p class="text-xs text-gray-500">No votes</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="vote(event.id, 'yes')"
                  :disabled="hasVoted(event)"
                  class="flex items-center justify-center px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckIcon class="h-4 w-4 mr-2" />
                  Yes
                </button>
                <button
                  @click="vote(event.id, 'no')"
                  :disabled="hasVoted(event)"
                  class="flex items-center justify-center px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XMarkIcon class="h-4 w-4 mr-2" />
                  No
                </button>
              </div>

              <!-- View Details Button -->
              <button
                @click="viewEventDetails(event)"
                class="w-full flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-400 hover:bg-indigo-500  text-white font-medium transition-colors duration-200"
              >
                <EyeIcon class="h-4 w-4 mr-2" />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- My Events Section -->
      <div v-if="activeTab === 'myEvents'" class="space-y-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 tracking-tight">My Events</h2>
            <span class="text-sm text-gray-500">Manage your events</span>
          </div>

          <!-- Search Bar for "My Events" -->
          <div class="relative w-full md:w-1/3">
            <input
              v-model="searchQueryMine"
              type="text"
              placeholder="Search my events..."
              class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <MagnifyingGlassIcon
              class="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 mt-4">
          <div
            v-for="event in filteredMyEvents"
            :key="event.id"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <!-- Event Image (Full Width) -->
            <div class="relative w-full">
              <img
                v-if="event.image"
                :src="event.image"
                alt="Event Image"
                class="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <CalendarIcon class="h-12 w-12 text-blue-300" />
              </div>
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {{ new Date(event.date).toLocaleDateString() }}
              </div>
            </div>
            
            <!-- Event Details -->
            <div class="p-6 space-y-4">
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">{{ event.title }}</h3>
                <p class="text-gray-600 text-sm line-clamp-2">{{ event.description }}</p>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div class="text-center">
                  <p class="text-green-500 font-bold text-lg">{{ event.votes.yes }}</p>
                  <p class="text-xs text-gray-500">Yes votes</p>
                </div>
                <div class="h-8 w-px bg-gray-200"></div>
                <div class="text-center">
                  <p class="text-red-500 font-bold text-lg">{{ event.votes.no }}</p>
                  <p class="text-xs text-gray-500">No votes</p>
                </div>
              </div>
              
              <button
                @click="editEvent(event)"
                class="w-full flex items-center justify-center px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
              >
                <PencilIcon class="h-4 w-4 mr-2" />
                Edit Event
              </button>

              <!-- View Details Button -->
              <button
                @click="viewEventDetails(event)"
                class="w-full flex items-center justify-center px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
              >
                <EyeIcon class="h-4 w-4 mr-2" />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Details Modal -->
      <div v-if="selectedEvent" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ selectedEvent.title }}</h2>
            <button @click="selectedEvent = null" class="text-gray-400 hover:text-gray-600">
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
          
          <div class="space-y-6">
            <!-- Event Image (Full Width) -->
            <div class="relative w-full h-96">
              <img
                v-if="selectedEvent.image"
                :src="selectedEvent.image"
                alt="Event Image"
                class="w-full h-full object-cover rounded-xl"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center rounded-xl">
                <CalendarIcon class="h-12 w-12 text-blue-300" />
              </div>
            </div>
            
            <!-- Event Description -->
            <div class="text-gray-600">{{ selectedEvent.description }}</div>
            
            <!-- Event Creator -->
            <div class="flex items-center text-sm text-gray-500">
              <UserIcon class="h-4 w-4 mr-2" />
              <span>{{ selectedEvent.creatorEmail }}</span>
            </div>
            
            <!-- Event Votes -->
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div class="text-center">
                <p class="text-green-500 font-bold text-lg">{{ selectedEvent.votes.yes }}</p>
                <p class="text-xs text-gray-500">Yes votes</p>
              </div>
              <div class="h-8 w-px bg-gray-200"></div>
              <div class="text-center">
                <p class="text-red-500 font-bold text-lg">{{ selectedEvent.votes.no }}</p>
                <p class="text-xs text-gray-500">No votes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

<!-- Add Event Section -->
<div v-if="activeTab === 'addEvent'" class="space-y-8">
  <div class="flex items-center justify-between">
    <h2 class="text-3xl font-bold text-gray-800 tracking-tight">Host Your Event</h2>
    <span class="text-sm text-gray-500">Bring your ideas to life and share them with the community</span>
  </div>
  
  <div class="bg-white rounded-2xl shadow-xl p-8">
    <form @submit.prevent="createEvent" class="space-y-6">
      <!-- Name Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Your Name</label>
        <input
          v-model="newEvent.creatorName"
          type="text"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter your name"
          required
        />
      </div>

      <!-- Email Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Your Email</label>
        <input
          v-model="newEvent.creatorEmail"
          type="email"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter your email"
          required
        />
      </div>

      <!-- Event Title Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Event Title</label>
        <input
          v-model="newEvent.title"
          type="text"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter a memorable title"
          required
        />
      </div>
      
      <!-- Event Description Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="newEvent.description"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
          placeholder="Describe your event"
          required
        ></textarea>
      </div>
      
      <!-- Event Date Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Event Date</label>
        <input
          v-model="newEvent.date"
          type="date"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>
      
      <!-- Event Image Field -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Event Image</label>
        <input
          type="file"
          @change="handleImageUpload"
          accept="image/*"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      
      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Create Event
      </button>
    </form>
  </div>
</div>
    </div>
  </div>
</template>
<script>
import {
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  PlusIcon,
  UserIcon,
  MagnifyingGlassIcon,
  EyeIcon,
} from "@heroicons/vue/24/outline";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  where,
  increment,
} from "firebase/firestore";

export default {
  name: "UserDashboard",
  components: {
    CalendarIcon,
    CheckIcon,
    XMarkIcon,
    PencilIcon,
    PlusIcon,
    UserIcon,
    MagnifyingGlassIcon,
    EyeIcon,
  },
  props: {
    activeTab: {
      type: String,
      default: "allEvents", // Default to "allEvents"
    },
  },
  data() {
    return {
      // Search inputs
      searchQueryAll: "",
      searchQueryMine: "",

      newEvent: {
        title: "",
        description: "",
        date: "",
        image: null, // Base64-encoded image
      },
      events: [], // All events
      myEvents: [], // Events created by the logged-in user

      isEditing: false, // Whether the edit modal is open
      editedEvent: {
        id: "",
        title: "",
        description: "",
        date: "",
        image: null,
      },

      selectedEvent: null, // Track the selected event for the modal
    };
  },
  computed: {
    // Computed property for filtered All Events
    filteredEventsAll() {
      if (!this.searchQueryAll.trim()) {
        return this.events;
      }
      const lowerQuery = this.searchQueryAll.toLowerCase();
      return this.events.filter(
        (event) =>
          event.title.toLowerCase().includes(lowerQuery) ||
          event.description.toLowerCase().includes(lowerQuery)
      );
    },
    // Computed property for filtered My Events
    filteredMyEvents() {
      if (!this.searchQueryMine.trim()) {
        return this.myEvents;
      }
      const lowerQuery = this.searchQueryMine.toLowerCase();
      return this.myEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(lowerQuery) ||
          event.description.toLowerCase().includes(lowerQuery)
      );
    },
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newEvent.image = e.target.result; // Base64-encoded image
        };
        reader.readAsDataURL(file); // Convert the image to Base64
      }
    },
    handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editedEvent.image = e.target.result; // Base64-encoded image
        };
        reader.readAsDataURL(file); // Convert the image to Base64
      }
    },
    async createEvent() {
      try {
        const user = auth.currentUser;
        if (user) {
          const eventDate = new Date(this.newEvent.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // set time to midnight for accurate comparison

          if (eventDate < today) {
            alert("Event date must be today or in the future.");
            return;
          }

          // Add the event to Firestore
          await addDoc(collection(db, "events"), {
            title: this.newEvent.title,
            description: this.newEvent.description,
            date: this.newEvent.date,
            image: this.newEvent.image,
            votes: {
              yes: 0,
              no: 0,
            },
            voters: [],
            createdBy: user.uid, // User ID of the creator
            creatorEmail: user.email, // Email of the creator
          });

          // Reset the form
          this.newEvent = { title: "", description: "", date: "", image: null };
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
    async editEvent(event) {
      this.editedEvent = { ...event }; // Set the event to be edited
      this.isEditing = true; // Open the edit modal
    },
    async saveEditedEvent() {
      try {
        const eventRef = doc(db, "events", this.editedEvent.id);
        await updateDoc(eventRef, {
          title: this.editedEvent.title,
          description: this.editedEvent.description,
          date: this.editedEvent.date,
          image: this.editedEvent.image,
        });
        this.isEditing = false; // Close the edit modal
        this.fetchMyEvents(); // Refresh the list of events
      } catch (error) {
        console.error("Error updating event:", error);
      }
    },
    cancelEdit() {
      this.isEditing = false; // Close the edit modal
    },
    async vote(eventId, voteType) {
      try {
        const user = auth.currentUser;
        if (user) {
          const eventRef = doc(db, "events", eventId);
          await updateDoc(eventRef, {
            [`votes.${voteType}`]: increment(1), // Increment the vote count
            voters: arrayUnion(user.uid), // Add the user's ID to the voters array
          });
        }
      } catch (error) {
        console.error("Error voting:", error);
      }
    },
    hasVoted(event) {
      const user = auth.currentUser;
      return user && event.voters.includes(user.uid); // Check if the user has already voted
    },
    async fetchMyEvents() {
      const user = auth.currentUser;
      if (user) {
        const myEventsQuery = query(collection(db, "events"), where("createdBy", "==", user.uid));
        onSnapshot(myEventsQuery, (snapshot) => {
          this.myEvents = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
        });
      }
    },
    async fetchAllEvents() {
      const q = query(collection(db, "events"));
      onSnapshot(q, (snapshot) => {
        this.events = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
      });
    },
    viewEventDetails(event) {
      this.selectedEvent = event; // Set the selected event for the modal
    },
  },
  async mounted() {
    await this.fetchAllEvents();
    await this.fetchMyEvents();
  },
  watch: {
    activeTab() {
      if (this.activeTab === "myEvents") {
        this.fetchMyEvents();
      } else if (this.activeTab === "allEvents") {
        this.fetchAllEvents();
      }
    },
  },
};
</script>