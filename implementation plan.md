# Implementation Plan - macOS Desktop Portfolio

Transform the current green-on-black terminal portfolio into a fully interactive macOS-inspired desktop experience.

## Proposed Changes

### [HTML & Layout Modifications](file:///e:/Projects/somya-portfolio-dev/inspo.html)

We will modify `inspo.html` directly to introduce the new interactive logic, structure, styles, and data loading.

#### 1. macOS Status Bar
- Replace the existing floating status bar container at the top right with a **full-width top menu bar** fixed at the top of the viewport (`fixed top-0 left-0 w-full z-50`).
- Style it with the terminal color scheme but macOS styling: a subtle semi-transparent background with blur (`bg-[#121212]/80 backdrop-blur-md border-b border-gray-800/40`), text height and icon sizes fitting macOS menu bar conventions.
- Left side: Add a terminal logo/symbol (e.g. `` or `$` or `Terminal`) and a list of dummy menu options (e.g., `File`, `Edit`, `View`, `Go`, `Window`, `Help`) styled as dim green/white text that matches the terminal theme.
- Right side: Maintain battery, Wi-Fi, search, control/tune, and a dynamic date/time block.

#### 2. Interactive Tooltips for Status Icons
- Implement custom styled HTML tooltips for the battery and Wi-Fi icons.
- Tooltips will show on hover, focus, and tap (using touch handlers for mobile support).
- Content:
  - **Battery**: `Always full after the coffee ☕`
  - **Wi-Fi**: `lol! makes sense obviously you're connected thats why you're here`
- Tooltips will be green-on-black styled, positioned below the status bar.

#### 3. Real-Time Date & Time
- Use a JS `setInterval` clock updating every second.
- Format today's date dynamically as `Day Mon Date Time AM/PM` (e.g., `Mon Aug 24 3:42 PM`).
- Match the typography and placement in the menu bar.

#### 4. Window Controls Action & Traffic Lights
- Map the traffic lights to DOM elements of the main window (`main[data-purpose="terminal-container"]`) and the contact window (`section[data-purpose="contact-section"]`).
- **Red Button**: Closes/hides the window. We'll use CSS scale and opacity transitions for smooth animations (`scale-95 opacity-0`).
- **Yellow Button**: Minimizes the window. We'll animate it collapsing into its title bar (i.e. collapsing content and setting window height to title bar height).
- **Green Button**: Maximizes/restores the window. Toggle a full-viewport style layout (`fixed inset-4 mt-12 md:inset-8 z-40`) to make it near-fullscreen.
- Add macOS-style symbols inside traffic lights on hover (a tiny `x` inside red, `-` inside yellow, `+` inside green) using CSS classes to make it look ultra-premium.

#### 5. Folder Icons & Windows Management
- Add click handlers to the 4 folders (About Me, Social Life, Projects, Experience).
- Clicking a folder creates and renders a new draggable macOS-style window with its respective title (`$ about-me`, `$ social-life`, `$ projects`, `$ experience`).
- Windows will start centered on the screen and will slightly cascade/offset (e.g. `top: calc(50% + i*20px); left: calc(50% + i*20px)`) if multiple are opened.
- Make them draggable by listening to mouse down/move/up events on their header, with bounds checks to keep them on screen.
- On mobile screens, windows will be near-fullscreen and stacking centered to maintain responsiveness.

#### 6. Dynamic GitHub Heatmap
- Expose a single variable `const GITHUB_USERNAME = "somyatanwar";` at the top of the script.
- Fetch contributions data from `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`.
- Parse the JSON response and render the grid cells using the intensity levels 0–4 matching the original colors (`bg-gray-800`, `bg-gray-700`, `bg-gray-600`, `bg-gray-500`, `bg-white`).
- Display month headings dynamically matching the fetched date ranges.
- Implement **Loading Skeleton** (pulsing grid elements) and **Error UI fallback** (message within the heatmap container indicating failure, with a retry button).

#### 7. Responsive Styling & Animations
- Ensure layout handles mobile sizes beautifully. Menu items on the left side of the status bar will hide on narrow screens to make room for status items and the clock.
- Set up CSS transitions (`transition-all duration-200 ease-out`) for window open, close, minimize, maximize, and drag.
- Respect `prefers-reduced-motion` in CSS to disable heavy animations if requested.

---

## Verification Plan

### Automated Verification
- We will open the application in the browser subagent, interact with all items, and verify all visual and interactive elements.

### Manual Verification
- Test hover/click interactions for Battery and Wi-Fi tooltips.
- Test Close, Minimize, Maximize actions on all windows.
- Open multiple folders, check dragging behavior.
- Toggle year filters on the GitHub heatmap and verify that real data renders correctly.
- Test mobile viewports and responsiveness.
