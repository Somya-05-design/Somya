<template>
  <div 
    v-if="!isClosed"
    ref="windowRef"
    :style="windowStyles"
    @mousedown="focusWindow"
    @touchstart="focusWindow"
    class="bg-[#121212] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono"
  >
    <!-- Header/Title bar (draggable handle) -->
    <div 
      @mousedown="startDrag"
      @touchstart="startTouchDrag"
      class="px-6 py-3 bg-[#181818] border-b border-gray-800/50 flex items-center justify-between cursor-move select-none"
    >
      <!-- Traffic light control buttons -->
      <div class="flex gap-2 group">
        <button 
          @click.stop="closeWindow"
          class="w-3.5 h-3.5 rounded-full bg-red-500/90 relative flex items-center justify-center hover:bg-red-600 transition-colors traffic-light-btn traffic-light-close"
          title="Close"
        />
        <button 
          @click.stop="isMinimized = !isMinimized"
          class="w-3.5 h-3.5 rounded-full bg-yellow-500/90 relative flex items-center justify-center hover:bg-yellow-600 transition-colors traffic-light-btn traffic-light-minimize"
          title="Minimize"
        />
        <button 
          @click.stop="isMaximized = !isMaximized"
          class="w-3.5 h-3.5 rounded-full bg-green-500/90 relative flex items-center justify-center hover:bg-green-600 transition-colors traffic-light-btn traffic-light-maximize"
          title="Maximize"
        />
      </div>

      <!-- Window Title -->
      <span class="text-gray-500 text-xs font-mono select-none">
        $ {{ title }}
      </span>

      <!-- Spacer -->
      <div class="w-16"></div>
    </div>

    <!-- Window body content slot -->
    <div 
      v-show="!isMinimized"
      class="p-6 md:p-8 flex-1 overflow-y-auto max-h-[60vh] text-gray-300"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['close']);

const isClosed = ref(false);
const isMinimized = ref(false);
const isMaximized = ref(false);
const zIndex = ref(20);
const position = ref({ x: 40, y: 100 });
const windowRef = ref(null);

let dragStart = { x: 0, y: 0 };
const isDragging = ref(false);

// Focus window: bring it to front by getting the next highest z-index
const focusWindow = () => {
  if (window.getNextZIndex) {
    zIndex.value = window.getNextZIndex();
  }
};

onMounted(() => {
  focusWindow();
  
  // Cascade placement: stagger windows based on index
  const offset = props.index * 25;
  if (window.innerWidth < 768) {
    position.value = {
      x: 12 + (props.index % 3) * 10,
      y: 120 + offset
    };
  } else {
    const defaultX = (window.innerWidth - 650) / 2 + offset;
    const defaultY = 150 + offset;
    position.value = { x: defaultX, y: defaultY };
  }
});

// Window styles computation
const windowStyles = computed(() => {
  if (isMaximized.value) {
    return {
      position: 'fixed',
      top: '2.5rem', // underneath status bar
      left: '0.5rem',
      right: '0.5rem',
      bottom: '0.5rem',
      width: 'calc(100% - 1rem)',
      height: 'calc(100vh - 3rem)',
      zIndex: zIndex.value,
      transform: 'none'
    };
  }

  return {
    position: 'absolute',
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    width: '92%',
    maxWidth: '650px',
    zIndex: zIndex.value
  };
});

// Close Action
const closeWindow = () => {
  isClosed.value = true;
  emit('close');
};

// Dragging implementation (Mouse)
const startDrag = (e) => {
  if (isMaximized.value || isMinimized.value) return;
  isDragging.value = true;
  dragStart = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y
  };
  focusWindow();
  
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  
  let newX = e.clientX - dragStart.x;
  let newY = e.clientY - dragStart.y;
  
  // Bounds checking
  const offsetWidth = windowRef.value?.offsetWidth || 300;
  const padding = 20;
  
  newX = Math.max(padding - offsetWidth, Math.min(window.innerWidth - padding, newX));
  newY = Math.max(32, Math.min(window.innerHeight - padding, newY)); // 32px menu bar offset
  
  position.value = { x: newX, y: newY };
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
};

// Dragging implementation (Touch)
const startTouchDrag = (e) => {
  if (isMaximized.value || isMinimized.value) return;
  const touch = e.touches[0];
  isDragging.value = true;
  dragStart = {
    x: touch.clientX - position.value.x,
    y: touch.clientY - position.value.y
  };
  focusWindow();
  
  window.addEventListener('touchmove', onTouchDrag);
  window.addEventListener('touchend', stopTouchDrag);
};

const onTouchDrag = (e) => {
  if (!isDragging.value) return;
  const touch = e.touches[0];
  let newX = touch.clientX - dragStart.x;
  let newY = touch.clientY - dragStart.y;
  
  newY = Math.max(32, Math.min(window.innerHeight - 50, newY));
  
  position.value = { x: newX, y: newY };
};

const stopTouchDrag = () => {
  isDragging.value = false;
  window.removeEventListener('touchmove', onTouchDrag);
  window.removeEventListener('touchend', stopTouchDrag);
};

onUnmounted(() => {
  stopDrag();
  stopTouchDrag();
});
</script>
