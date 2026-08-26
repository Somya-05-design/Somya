import './index.css';

// ----------------------------------------------------
// 1. GLOBAL WINDOW Z-INDEX MANAGER
// ----------------------------------------------------
// Allows windows from both React and Vue systems to
// properly focus and stack above each other on click.
window.highestZIndex = 20;
window.getNextZIndex = () => {
  window.highestZIndex += 1;
  return window.highestZIndex;
};

// ----------------------------------------------------
// 2. MOUNT REACT APPLICATION
// ----------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactApp from './react/ReactApp.jsx';

const reactRootEl = document.getElementById('react-root');
if (reactRootEl) {
  const root = ReactDOM.createRoot(reactRootEl);
  root.render(
    <React.StrictMode>
      <ReactApp />
    </React.StrictMode>
  );
}

// ----------------------------------------------------
// 3. MOUNT VUE APPLICATION
// ----------------------------------------------------
import { createApp } from 'vue';
import VueApp from './vue/VueApp.vue';

const vueRootEl = document.getElementById('vue-root');
if (vueRootEl) {
  const app = createApp(VueApp);
  app.mount(vueRootEl);
}
