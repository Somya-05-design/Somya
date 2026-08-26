<template>
  <div class="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-4xl mx-auto font-mono select-none px-4">
    <div 
      v-for="folder in folders" 
      :key="folder.type"
      @click="openFolder(folder.type, folder.title)"
      @dblclick="openFolder(folder.type, folder.title)"
      @touchend="handleTouch(folder.type, folder.title)"
      class="flex flex-col items-center gap-2 w-24 group cursor-pointer transition-transform active:scale-95"
    >
      <div class="relative p-1 rounded-lg group-hover:bg-green-500/10 transition-colors">
        <img 
          :alt="folder.title" 
          class="w-16 h-16 shadow-xl object-contain filter hover:brightness-110"
          :src="folder.img"
        />
      </div>
      <span class="text-white font-mono text-xs md:text-sm bg-black/40 px-2 py-0.5 rounded border border-transparent group-hover:border-green-500/30 group-hover:text-green-400 text-center transition-all select-none">
        {{ folder.title }}
      </span>
      <!-- Hint helper for desktop/mobile -->
      <span class="text-[9px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity select-none hidden md:block">
        Click to open
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const folders = ref([
  {
    type: 'about-me',
    title: 'About Me',
    img: '/folder-about.svg'
  },
  {
    type: 'social-life',
    title: 'Socials',
    img: '/folder-socials.svg'
  },
  {
    type: 'projects',
    title: 'Projects',
    img: '/folder-projects.svg'
  },
  {
    type: 'experience',
    title: 'Experience',
    img: '/folder-experience.svg'
  }
]);

// Dispatch to window so the overlay Vue App receives the open command
const openFolder = (type, title) => {
  window.dispatchEvent(new CustomEvent('open-folder-window', {
    detail: { type, title }
  }));
};

// Double-tap/click logic for mobile
let lastTap = 0;
const handleTouch = (type, title) => {
  const currentTime = new Date().getTime();
  const tapDelay = 300;
  if (currentTime - lastTap < tapDelay) {
    openFolder(type, title);
  } else {
    // If mobile, single tap works too for better accessibility!
    if (window.innerWidth < 768) {
      openFolder(type, title);
    }
  }
  lastTap = currentTime;
};
</script>
