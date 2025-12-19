import { Thermometer, Droplets } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Sensor } from '../../types';

interface SensorCardProps {
  sensor: Sensor;
}

export function SensorCard({ sensor }: SensorCardProps) {
  const getIcon = () => {
    switch (sensor.type) {
      case 'temperature':
        return <Thermometer size={24} />;
      case 'humidity':
        return <Droplets size={24} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (sensor.status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  const getIconColor = () => {
    switch (sensor.type) {
      case 'temperature':
        return 'text-orange-500';
      case 'humidity':
        return 'text-blue-500';
      default:
        return '';
    }
  };

  const formatValue = () => {
    return `${sensor.value}${sensor.unit}`;
  };

  const formatTimestamp = () => {
    const date = new Date(sensor.lastUpdated);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg bg-gray-50 ${getIconColor()}`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 capitalize">
              {sensor.type}
            </h3>
            <p className="text-sm text-gray-500">{sensor.location}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
        >
          {sensor.status}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {formatValue()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Updated {formatTimestamp()}
          </p>
        </div>
      </div>
    </Card>
  );
}
