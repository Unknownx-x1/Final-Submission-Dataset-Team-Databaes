interface ChartProps {
  data: Array<{ label: string; value: number; forecast?: number }>;
  height?: number;
}

export function LineChart({ data, height = 300 }: ChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.forecast || 0)));
  const minValue = Math.min(...data.map(d => Math.min(d.value, d.forecast || 0)));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return height - ((value - minValue) / range) * (height - 40);
  };

  const actualPoints = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: getY(d.value),
  }));

  const forecastPoints = data
    .filter(d => d.forecast !== undefined)
    .map((d, i, arr) => ({
      x: ((data.indexOf(d)) / (data.length - 1)) * 100,
      y: getY(d.forecast!),
    }));

  const createPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return '';
    return points.reduce((path, point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      return `${path} L ${point.x} ${point.y}`;
    }, '');
  };

  return (
    <div className="relative">
      <svg width="100%" height={height} className="overflow-visible">
        <defs>
          <linearGradient id="actualGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={`${createPath(actualPoints)} L 100 ${height} L 0 ${height} Z`}
          fill="url(#actualGradient)"
        />

        <path
          d={createPath(actualPoints)}
          fill="none"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {forecastPoints.length > 0 && (
          <path
            d={createPath(forecastPoints)}
            fill="none"
            stroke="rgb(156, 163, 175)"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {actualPoints.map((point, i) => (
          <g key={i}>
            <circle
              cx={`${point.x}%`}
              cy={point.y}
              r="4"
              fill="rgb(59, 130, 246)"
              className="transition-all duration-200 hover:r-6"
            />
          </g>
        ))}
      </svg>

      <div className="flex justify-between mt-2 px-2">
        {data.map((d, i) => (
          i % Math.ceil(data.length / 6) === 0 && (
            <span key={i} className="text-xs text-gray-500">
              {d.label}
            </span>
          )
        ))}
      </div>
    </div>
  );
}
