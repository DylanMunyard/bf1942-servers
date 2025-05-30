<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import ServerTable from './components/ServerTable.vue'
import PlayersPage from './components/PlayersPage.vue'

// Active page state
const activePage = ref<'servers' | 'players'>('servers');

// Dark mode state
const isDarkMode = ref(false);

// Function to toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  // Save preference to localStorage
  localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false');
  updateTheme();
};

// Function to update theme based on dark mode state
const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
    document.documentElement.classList.add('light-mode');
  }
};

// Initialize dark mode from localStorage or system preference
onMounted(() => {
  // Check localStorage first
  const storedDarkMode = localStorage.getItem('darkMode');
  if (storedDarkMode !== null) {
    isDarkMode.value = storedDarkMode === 'true';
  } else {
    // If no localStorage value, check system preference
    isDarkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Apply initial theme
  updateTheme();

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't set a preference
    if (localStorage.getItem('darkMode') === null) {
      isDarkMode.value = e.matches;
      updateTheme();
    }
  });
});

// Watch for changes to isDarkMode
watch(isDarkMode, () => {
  updateTheme();
});
</script>

<template>
  <div class="app">
    <div class="theme-toggle">
      <button @click="toggleDarkMode" class="theme-toggle-button" :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <span v-if="isDarkMode" class="toggle-icon">☀️</span>
        <span v-else class="toggle-icon">🌙</span>
      </button>
    </div>

    <div class="main-navigation">
      <button 
        @click="activePage = 'servers'" 
        class="nav-button" 
        :class="{ active: activePage === 'servers' }"
      >
        Servers
      </button>
      <button 
        @click="activePage = 'players'" 
        class="nav-button" 
        :class="{ active: activePage === 'players' }"
      >
        Players
      </button>
    </div>

    <ServerTable v-if="activePage === 'servers'" />
    <PlayersPage v-else-if="activePage === 'players'" />
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  margin-top: 20px;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.theme-toggle-button {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.theme-toggle-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.toggle-icon {
  font-size: 20px;
}

.main-navigation {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.nav-button {
  padding: 10px 20px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: var(--color-background-mute);
}

.nav-button.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
</style>
