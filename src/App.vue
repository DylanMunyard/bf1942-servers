<script setup lang="ts">
import { ref, onMounted, watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DashboardLayout from './layouts/DashboardLayout.vue';

const router = useRouter();
const route = useRoute();

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

// Provide dark mode state and toggle function to descendants
provide('isDarkMode', isDarkMode);
provide('toggleDarkMode', toggleDarkMode);
</script>

<template>
  <DashboardLayout />
</template>

<style>
/* Global styles */
:root {
  --color-primary: #3498db;
  --color-primary-hover: #2980b9;
  --color-accent: #e67e22;
  --color-accent-hover: #d35400;
  --color-background: #ffffff;
  --color-background-soft: #f8f9f9;
  --color-background-mute: #e5e8e8;
  --color-border: #d7dbdd;
  --color-text: #2c3e50;
  --color-text-muted: #7f8c8d;
  --color-heading: #2c3e50;
  --color-primary-rgb: 52, 152, 219;
  --sidebar-bg: #0f172a;
  --sidebar-border: #334155;
  --sidebar-text: #f8fafc;
  --sidebar-text-muted: #94a3b8;
  --sidebar-hover: #1e293b;
  --sidebar-active: #475569;
  --sidebar-submenu: #020617;
}

/* Dark mode styles */
.dark-mode {
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
  --color-background: #0f172a;
  --color-background-soft: #1e293b;
  --color-background-mute: #334155;
  --color-border: #475569;
  --color-text: #f8fafc;
  --color-text-muted: #cbd5e1;
  --color-heading: #f1f5f9;
  --color-primary-rgb: 96, 165, 250;
  --sidebar-bg: #020617;
  --sidebar-border: #1e293b;
  --sidebar-text: #f8fafc;
  --sidebar-text-muted: #94a3b8;
  --sidebar-hover: #0f172a;
  --sidebar-active: #334155;
  --sidebar-submenu: #000000;
}

/* Light mode styles (explicit) */
.light-mode {
  --color-primary: #3498db;
  --color-primary-hover: #2980b9;
  --color-accent: #e67e22;
  --color-accent-hover: #d35400;
  --color-background: #ffffff;
  --color-background-soft: #f8f9f9;
  --color-background-mute: #e5e8e8;
  --color-border: #d7dbdd;
  --color-text: #2c3e50;
  --color-text-muted: #7f8c8d;
  --color-heading: #2c3e50;
  --color-primary-rgb: 52, 152, 219;
  --sidebar-bg: #0f172a;
  --sidebar-border: #334155;
  --sidebar-text: #f8fafc;
  --sidebar-text-muted: #94a3b8;
  --sidebar-hover: #1e293b;
  --sidebar-active: #475569;
  --sidebar-submenu: #020617;
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-background);
  color: var(--color-text);
}

#app {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
  color: var(--color-primary);
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: var(--color-primary-hover);
}

.app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  margin-top: 20px;
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
