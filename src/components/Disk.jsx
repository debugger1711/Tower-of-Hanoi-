export default function Disk({ size, onDragStart, isDraggable = true }) {
  const colors = [
    'from-cyan-400 to-blue-500', 
    'from-purple-400 to-pink-500', 
    'from-emerald-400 to-teal-500', 
    'from-orange-400 to-red-500',
    'from-indigo-400 to-purple-600'
  ];
  
  // Responsive disk width classes
  const getDiskWidthClass = (size) => {
    const widths = {
      1: 'w-8 sm:w-10 md:w-12 lg:w-14',
      2: 'w-10 sm:w-12 md:w-16 lg:w-18',
      3: 'w-12 sm:w-16 md:w-20 lg:w-22',
      4: 'w-14 sm:w-20 md:w-24 lg:w-26',
      5: 'w-16 sm:w-24 md:w-28 lg:w-30',
      6: 'w-18 sm:w-28 md:w-32 lg:w-34',
      7: 'w-20 sm:w-32 md:w-36 lg:w-38',
      8: 'w-22 sm:w-36 md:w-40 lg:w-42'
    };
    return widths[size] || widths[8];
  };
  
  return (
    <div 
      draggable={isDraggable}
      onDragStart={onDragStart}
      className={`${getDiskWidthClass(size)} h-4 sm:h-5 md:h-6 rounded-full border border-white/20 shadow-lg mb-1 bg-gradient-to-r ${colors[size % 5]} flex items-center justify-center text-[8px] sm:text-[10px] md:text-[10px] font-bold ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {size}
    </div>
  );
}