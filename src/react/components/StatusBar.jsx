import React, { useState, useEffect } from 'react';

export default function StatusBar() {
  const [timeStr, setTimeStr] = useState('');
  const [activeTooltip, setActiveTooltip] = useState(null); // 'battery' | 'wifi' | null

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };

      // Customize format: "Mon Aug 24 3:42 PM"
      const formatted = now.toLocaleDateString('en-US', options);
      // Remove comma after weekday/day
      setTimeStr(formatted.replace(/,/g, ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-[#121212]/80 backdrop-blur-md border-b border-gray-800/40 text-gray-300 font-mono text-xs flex items-center justify-between px-4 z-50 select-none">
      {/* Left side: Terminal Menu */}
      <div className="flex items-center gap-2.5">
        <span className="font-bold text-white cursor-default">Somya's Terminal</span>
        <div className="hidden md:flex gap-4 text-gray-400">
          <span className="hover:text-white cursor-default transition-colors">File</span>
          <span className="hover:text-white cursor-default transition-colors">Edit</span>
          <span className="hover:text-white cursor-default transition-colors">View</span>
          <span className="hover:text-white cursor-default transition-colors">Go</span>
          <span className="hover:text-white cursor-default transition-colors">Window</span>
          <span className="hover:text-white cursor-default transition-colors">Help</span>
        </div>
      </div>

      {/* Right side: Status indicators & time */}
      <div className="flex items-center gap-4 relative">
        {/* Battery Icon with Tooltip */}
        <div
          className="relative flex items-center cursor-default py-1"
          onMouseEnter={() => setActiveTooltip('battery')}
          onMouseLeave={() => setActiveTooltip(null)}
          onClick={() => setActiveTooltip(activeTooltip === 'battery' ? null : 'battery')}
        >
          <span className="material-symbols-outlined text-sm hover:text-white transition-colors">battery_full</span>

          {activeTooltip === 'battery' && (
            <div className="absolute right-0 top-7 bg-[#121212] border border-gray-600/50 text-gray-200 px-3 py-1.5 rounded shadow-xl whitespace-nowrap z-50 text-[11px] animate-fade-in">
              Always full after the coffee ☕
            </div>
          )}
        </div>

        {/* Wi-Fi Icon with Tooltip */}
        <div
          className="relative flex items-center cursor-default py-1"
          onMouseEnter={() => setActiveTooltip('wifi')}
          onMouseLeave={() => setActiveTooltip(null)}
          onClick={() => setActiveTooltip(activeTooltip === 'wifi' ? null : 'wifi')}
        >
          <span className="material-symbols-outlined text-sm hover:text-white transition-colors">wifi</span>

          {activeTooltip === 'wifi' && (
            <div className="absolute right-0 top-7 bg-[#121212] border border-gray-600/50 text-gray-200 px-3 py-1.5 rounded shadow-xl w-64 md:w-80 whitespace-normal z-50 text-[11px] leading-relaxed text-right animate-fade-in">
              lol! makes sense obviously you're connected thats why you're here
            </div>
          )}
        </div>

        {/* Search Icon */}
        <span className="material-symbols-outlined text-sm cursor-default hover:text-white transition-colors">search</span>

        {/* Dynamic Date & Time */}
        <span className="text-white hover:text-white cursor-default transition-colors font-semibold">
          {timeStr}
        </span>
      </div>
    </div>
  );
}
