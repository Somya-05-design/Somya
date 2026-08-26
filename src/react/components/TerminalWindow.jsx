import React, { useState } from 'react';

export default function TerminalWindow() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [zIndex, setZIndex] = useState(15);

  const focusWindow = () => {
    if (window.getNextZIndex) {
      setZIndex(window.getNextZIndex());
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => { setIsOpen(true); focusWindow(); }}
          className="bg-[#121212] border border-green-500 text-green-400 font-mono text-xs px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 hover:bg-green-500 hover:text-black transition-all"
        >
          <span className="material-symbols-outlined text-sm">terminal</span>
          Restore Terminal
        </button>
      </div>
    );
  }

  // Styles for Maximized vs Normal centered flow state
  const windowStyles = isMaximized
    ? {
      position: 'fixed',
      top: '2.5rem', // below status bar
      left: '0.5rem',
      right: '0.5rem',
      bottom: '0.5rem',
      width: 'calc(100% - 1rem)',
      height: 'calc(100vh - 3rem)',
      transform: 'none',
      zIndex: zIndex
    }
    : {
      position: 'relative',
      margin: '0 auto',
      width: '100%',
      zIndex: zIndex
    };

  return (
    <main
      style={windowStyles}
      onClick={focusWindow}
      className="bg-[#121212] rounded-xl shadow-2xl border border-gray-800/80 overflow-hidden transition-all duration-300 w-full"
      data-purpose="terminal-container"
    >
      {/* Window Controls Header */}
      <div
        className="px-6 py-3 bg-[#181818] border-b border-gray-800/50 flex items-center justify-between select-none"
        data-purpose="window-controls"
      >
        {/* Left Side: Traffic Lights (Static - active only on folder windows) */}
        <div className="flex gap-2 select-none">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
        </div>

        {/* Center: Title */}
        <span className="text-gray-500 text-xs font-mono select-none">
          somya@macbook-pro: ~ (bash)
        </span>

        {/* Spacer */}
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      {!isMinimized && (
        <div className="px-8 py-6 font-mono overflow-y-auto max-h-[70vh]" data-purpose="terminal-content">
          {/* Command 1 */}
          <div className="mt-2 mb-2">
            <span className="text-green-400 font-bold">$ who.am.i</span>
          </div>
          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            Somya Tanwar
          </h1>
          {/* Title */}
          <p className="text-lg md:text-xl text-gray-400 mb-6">
            Backend Enthusiast & System Craftsman
          </p>

          {/* Command 2 */}
          <div className="mb-3">
            <span className="text-green-400 font-bold">$ skills --list</span>
          </div>
          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {['Springboot', 'Java', 'Node.js', 'Kafka', 'Docker', 'Kubernetes', 'REST APIs', 'PostgreSQL', 'Redis'].map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 bg-[#1a2e20]/60 text-green-300 rounded border border-[#2d4d38]/80 text-xs md:text-sm hover:border-green-400 hover:bg-[#1a2e20] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Prompt ready */}
          <div className="flex items-center gap-2 text-green-400/80 text-xs md:text-sm border-t border-gray-900 pt-4 mt-6">
            <span>$ open desktop_folders/</span>
            <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
          </div>
        </div>
      )}
    </main>
  );
}
