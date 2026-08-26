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
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1XZ2YhdUqretVswbHihGpMbHNPn9Jf5ZfLvBG3OxavZ3LMbkYsqQHTf6-3ZHqGD3ZuJqjWrBqb2w6oGPyvNk9ejr3Z-HZToylZEWHkIiP8c-XfcSiffQBPAhRX_pPG4NBiMssYMH64TzPjzKMEjgSNwzyUzxsvs_ZvCG1vN54IRc3tbVZYN6-YkEN6yS6J9KSi-3nZyjRZZBXKPkwYRUUj2K0PmtbuvNtIhBzDPLP7kfVbdtdUyjA1m1HU'
  },
  {
    type: 'social-life',
    title: 'Socials',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1XU8br4d2QKccHyw2Q2H7EZkzhPDLrHd62pMi9UfLxLVCy8JFaTOpmVttkhhQiyNJIwbbVSb1Npf6sHik8cj2mprUR9c9u_BdtEGETMf2puPSG9rQS-fOA-0cSbJN6Wmecb0ipA6sDbezJw0PG1Sa9RgFwFK-XbMjcH5NFg-K1ZOza71bt0eCy3E16iJ4G7KjhAuVkht8KLJZy_MM8MS2Tbeo1lGBs9-HzBZQcP0Z0acvNID4nF1b8Fvg'
  },
  {
    type: 'projects',
    title: 'Projects',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1XT0awo0iHKr8ogQXH6OzM_pCrYTs_AErJYIDXWVaEqhLJYvnMTPSAYOL_tbxNQQ1vmnyiGBMmpGmfkVO9E_msMC4ZUoiwCa4Dpr4H4vjCyQjZp7h8kGnsABlX9_Otsr4BA3XKyKEmq7m2ngOKDPomtpgyjBQGNbI_3bS3ZqDWWWrpJEX8S2Iqvg5I_dlRCnqtSXb4jsT-NK7y7Zn441yyXbUR2PHsMrgmxntpFd9XPPRa4M6oYouD5QnU'
  },
  {
    type: 'experience',
    title: 'Experience',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1WpbYtV8itHm5_jbmjrUKQMRI2gEnLrMIwbyH-3ROP39-_CrptRTOnVQ3m12JKOrotUEqcMR4hx6QdKnjFT60LQGwdekmUOJ6GQIgLG3KaKeuaVg_G_t_DEgBnvDv4ROQ1pCoPmE2plawvZ9Mn-q_nkdoUSARFjtENm3eMDgXus8vyeWrk7rtSzIMsZ9ElmLmk3JE9_uxIswuXUC6rYE1Ny1LpWaozT0rrDmLVi-JhZEDlToVMA8JOaUQ'
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
