import Disk from './Disk';

export default function Peg({ id, disks, onClick, isSelected, isMoving, onDrop, onDragOver, onDiskDragStart }) {
  return (
    <div 
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      className={`flex flex-col items-center group px-2 sm:px-4 transition-opacity ${isMoving ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <div className={`w-2 sm:w-3 h-32 sm:h-40 md:h-48 rounded-t-full absolute bottom-8 sm:bottom-10 -z-10 transition-all duration-300 ${isSelected ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.6)] border-2 border-slate-400'}`}></div>
      <div className="flex flex-col-reverse items-center min-h-32 sm:min-h-40 md:min-h-48 w-24 sm:w-32 md:w-40">
        {disks.map((d, i) => {
          // Only the top disk is draggable
          const isTopDisk = i === disks.length - 1;
          return (
            <Disk 
              key={i} 
              size={d} 
              isDraggable={isTopDisk && !isMoving}
              onDragStart={() => onDiskDragStart && onDiskDragStart(id)}
            />
          );
        })}
      </div>
      <span className={`mt-4 sm:mt-6 font-bold text-sm sm:text-base transition-colors ${isSelected ? 'text-cyan-400' : isMoving ? 'text-slate-600' : 'text-slate-500'}`}>{id}</span>
    </div>
  );
}