import React, { useEffect, useRef } from 'react';
import StatusBar from './components/StatusBar.jsx';
import TerminalWindow from './components/TerminalWindow.jsx';
import GitHubHeatmap from './components/GitHubHeatmap.jsx';
import ContactWindow from './components/ContactWindow.jsx';

export default function ReactApp() {
  const foldersMountRef = useRef(null);

  // Mount the Vue folders grid component into this React component on load.
  // This demonstrates a deep cross-framework layout bridge!
  useEffect(() => {
    const mountVueFolders = async () => {
      if (foldersMountRef.current) {
        // Import dynamically to avoid loading issues
        const { createApp } = await import('vue');
        const { default: DesktopFolders } = await import('../vue/components/DesktopFolders.vue');

        const app = createApp(DesktopFolders);
        app.mount(foldersMountRef.current);

        return () => {
          app.unmount();
        };
      }
    };

    let unmountFn;
    mountVueFolders().then(cleanup => {
      unmountFn = cleanup;
    });

    return () => {
      if (unmountFn) unmountFn();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 flex-col pt-12 pb-24 relative select-none">
      {/* 1. macOS Status Bar (React) */}
      <StatusBar />

      {/* 2. Interactive Terminal Window (React) */}
      <div className="w-full max-w-4xl relative mb-8">
        <TerminalWindow />
      </div>

      {/* Quote Separator */}
      <section className="w-full max-w-4xl my-12 text-center font-mono">
        <p className="text-white text-lg md:text-xl font-bold uppercase tracking-widest animate-pulse">
          WITH GREAT POWERS COMES GREAT RESPONSIBILITIES
        </p>
      </section>

      {/* 4. Desktop Folder Grid (Vue App mounted here dynamically) */}
      <section className="w-full max-w-4xl my-10 min-h-[120px]">
        <div ref={foldersMountRef} id="vue-folders-bridge">
          {/* Vue folder icons render here dynamically */}
          <div className="text-center text-xs text-gray-500 py-4 animate-pulse">
            Connecting Vue Desktop Icons...
          </div>
        </div>
      </section>

      {/* 3. Statistics Grid (React) */}
      <section className="w-full max-w-4xl px-8 my-8 font-mono">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between text-center">
          <div className="flex flex-col items-center">

            <span className="text-4xl md:text-5xl font-bold text-white">1M+</span>
            <span className="text-gray-400 text-xs mt-2 tracking-widest">AI TOKENS USED</span>
          </div>
          <div className="flex flex-col items-center">

            <span className="text-4xl md:text-5xl font-bold text-white">500+</span>
            <span className="text-gray-400 text-xs mt-2 tracking-widest font-mono">COFFEES DRANK</span>
          </div>
          <div className="flex flex-col items-center">

            <span className="text-4xl md:text-5xl font-bold text-white">1000+</span>
            <span className="text-gray-400 text-xs mt-2 tracking-widest">CODE COMMITS</span>
          </div>
        </div>
      </section>

      {/* 5. Personal GitHub Activity Heatmap (React) */}
      <GitHubHeatmap />

      {/* 6. Contact Window (React) */}
      <div className="w-full max-w-4xl relative my-10">
        <ContactWindow />
      </div>

      {/* Invitation Quote */}
      <section className="w-full max-w-4xl mt-6 mb-12 text-center font-mono">
        <p className="text-white text-lg md:text-xl font-bold uppercase tracking-widest">
          you came till the end, shows you're intrested, lets have a chat
        </p>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center font-mono border-t border-gray-900 pt-8">
        <p className="text-gray-400 text-sm uppercase tracking-widest">somya portfolio @2026</p>
      </footer>
    </div>
  );
}


