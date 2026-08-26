<template>
  <!-- Transparent global container, allowing clicks to pass through to elements underneath -->
  <div class="pointer-events-none fixed inset-0 z-30 overflow-hidden">
    <!-- Semi-transparent backdrop when folder windows are active -->
    <div 
      v-if="activeWindows.length > 0"
      class="fixed inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-200"
      @click="closeAllWindows"
      @touchstart="closeAllWindows"
    />

    <!-- Render all active folder windows -->
    <FolderWindow
      v-for="(win, idx) in activeWindows"
      :key="win.id"
      :title="win.title"
      :type="win.type"
      :index="idx"
      @close="closeWindow(win.id)"
      class="pointer-events-auto relative z-30"
    >
      <WindowContent :type="win.type" />
    </FolderWindow>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FolderWindow from './components/FolderWindow.vue';
import WindowContent from './components/WindowContent.vue';

const activeWindows = ref([]);

// Window opening event handler
const handleOpenWindow = (e) => {
  const { type, title } = e.detail;
  
  // Check if a window of this type is already open
  const existing = activeWindows.value.find(w => w.type === type);
  if (existing) {
    // If it exists, let's just trigger focus by updating its zIndex (simulated)
    return;
  }
  
  // Add a new window config to stack
  activeWindows.value.push({
    id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
    type,
    title
  });
};

const closeWindow = (id) => {
  activeWindows.value = activeWindows.value.filter(w => w.id !== id);
};

const closeAllWindows = () => {
  activeWindows.value = [];
};

onMounted(() => {
  // Listen for the cross-framework window open event
  window.addEventListener('open-folder-window', handleOpenWindow);
});

onUnmounted(() => {
  window.removeEventListener('open-folder-window', handleOpenWindow);
});
</script>
