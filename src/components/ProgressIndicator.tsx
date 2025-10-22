interface ProgressBarProps {
  percentage: number;
  color?: string; 
}

export default function ProgressBar({ percentage, color  }: ProgressBarProps) {
  return (
    <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
      <div
        className={` h-full rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%`, backgroundColor:color }}
      ></div>
    </div>
  );
}
