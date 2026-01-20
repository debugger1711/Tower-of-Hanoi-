import React from 'react';

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-spin-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-purple-500/20 rotate-45 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg animate-float"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-slate-500/20 rounded-full animate-bounce-slow"></div>
      <div className="absolute top-1/6 right-1/3 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rotate-12 animate-float-delayed"></div>

      {/* Additional creative elements */}
      <div className="absolute top-1/3 right-1/6 w-8 h-8 border border-cyan-400/30 rounded-full animate-orbit"></div>
      <div className="absolute bottom-1/3 left-1/5 w-6 h-6 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 rounded animate-glow"></div>
      <div className="absolute top-2/3 right-1/2 w-10 h-10 border-2 border-slate-400/20 rotate-30 animate-pulse-slow"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1)_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Animated lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-slide-right"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-slide-left"></div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-lg animate-shimmer"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-purple-500/20 rounded-tr-lg animate-shimmer"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-purple-500/20 rounded-bl-lg animate-shimmer"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/20 rounded-br-lg animate-shimmer"></div>
    </div>
  );
};

export default BackgroundElements;