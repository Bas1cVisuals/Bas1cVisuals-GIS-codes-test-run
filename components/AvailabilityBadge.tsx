import React from 'react';

export const AvailabilityBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/50 border border-neutral-200 backdrop-blur-sm shadow-sm transition-transform hover:scale-105 duration-300">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
        Currently accepting projects
      </span>
    </div>
  );
};
