import React, { useState } from 'react';

export default function ContactWindow() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [zIndex, setZIndex] = useState(14);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Sending State
  const [status, setStatus] = useState('idle'); // 'idle' | 'validating' | 'sending' | 'success' | 'error'
  const [logs, setLogs] = useState([]);

  const focusWindow = () => {
    if (window.getNextZIndex) {
      setZIndex(window.getNextZIndex());
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in all inputs: name, email, and message.');
      return;
    }

    // Basic regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please input a valid email address.');
      return;
    }

    setStatus('sending');
    setLogs(['Initiating transmission protocol...']);

    // Log progress animations
    const stepLogs = [
      'Establishing secure TLS handshake with backend server...',
      'Encrypting data packets (AES-256)...',
      'Deploying mail delivery agent...',
      'Message successfully routed! [HTTP 200 OK]'
    ];

    stepLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === stepLogs.length - 1) {
          setStatus('success');
          // Reset form fields
          setName('');
          setEmail('');
          setMessage('');
        }
      }, (index + 1) * 600);
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-16 right-4 z-50">
        <button
          onClick={() => { setIsOpen(true); focusWindow(); }}
          className="bg-[#121212] border border-green-500 text-green-400 font-mono text-xs px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 hover:bg-green-500 hover:text-black transition-all"
        >
          <span className="material-symbols-outlined text-sm">mail</span>
          Restore Contact Term
        </button>
      </div>
    );
  }

  const maximizedStyles = isMaximized
    ? {
      position: 'fixed',
      top: '2.5rem',
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
    <section
      style={maximizedStyles}
      onClick={focusWindow}
      className="bg-[#121212] border border-gray-800/80 rounded-xl shadow-2xl overflow-hidden mb-12 w-full"
      data-purpose="contact-section"
    >
      {/* Window Controls Header */}
      <div
        className="px-6 py-3 bg-[#181818] border-b border-gray-800/50 flex items-center justify-between select-none"
      >
        {/* Left Side: Traffic Lights (Static - active only on folder windows) */}
        <div className="flex gap-2 select-none">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
        </div>

        {/* Center: Title */}
        <span className="text-gray-500 text-xs font-mono select-none">
          somya@macbook-pro: ~ (mail-agent)
        </span>

        {/* Spacer */}
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      {!isMinimized && (
        <div className={isMaximized ? "p-6 md:p-8 font-mono overflow-y-auto max-h-[calc(100vh-6rem)]" : "p-6 md:p-8 font-mono"}>
          {/* Static Email */}
          <div className="mb-8">
            <div className="mb-2"><span className="text-green-400 font-bold">$ contact --email</span></div>
            <a
              href="mailto:isomyatanwar@gmail.com"
              className="inline-block px-4 py-2 bg-[#1a2e20]/60 text-green-300 rounded border border-[#2d4d38]/85 hover:border-green-400 hover:bg-[#1a2e20] transition-colors"
            >
              isomyatanwar@gmail.com
            </a>
          </div>

          <div className="mb-6">
            <div className="mb-4"><span className="text-green-400 font-bold">$ send-message</span></div>

            {status === 'sending' || status === 'success' ? (
              /* Terminal sending logs simulation */
              <div className="bg-black/40 border border-gray-800 rounded p-6 space-y-2.5 text-xs md:text-sm text-green-400 min-h-[220px]">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-500 font-bold">&gt;&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                {status === 'success' && (
                  <div className="mt-6 pt-4 border-t border-gray-900 flex flex-col gap-2">
                    <span className="text-white text-base font-bold">✓ Mission Accomplished!</span>
                    <span className="text-gray-400">Your message is securely stored. I'll get back to you shortly.</span>
                    <button
                      onClick={() => setStatus('idle')}
                      className="w-40 mt-4 px-3 py-1.5 border border-green-500/50 text-green-400 rounded hover:bg-green-500 hover:text-black transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSend} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-green-400 font-bold text-sm">$ name:</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                    type="text"
                    placeholder="Somya's Guest"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-green-400 font-bold text-sm">$ email:</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                    type="email"
                    placeholder="guest@example.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-green-400 font-bold text-sm">$ message:</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-gray-800 rounded p-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                    rows="4"
                    placeholder="Hello Somya, love the macOS desktop!"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-4 bg-green-500 text-[#121212] font-bold rounded-lg hover:bg-green-400 active:scale-[0.99] transition-all text-lg"
                >
                  SendMessage()
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
