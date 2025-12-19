import { Lightbulb, Wind, Plug, AirVent } from 'lucide-react';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import type { Device } from '../../types';

interface DeviceCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
}

export function DeviceCard({ device, onToggle }: DeviceCardProps) {
  const getIcon = () => {
    switch (device.type) {
      case 'light':
        return <Lightbulb size={24} />;
      case 'ac':
        return <AirVent size={24} />;
      case 'fan':
        return <Wind size={24} />;
      case 'plug':
        return <Plug size={24} />;
      default:
        return null;
    }
  };

  const getColor = () => {
    if (device.status === 'off') return 'text-gray-400';
    switch (device.type) {
      case 'light':
        return 'text-yellow-500';
      case 'ac':
        return 'text-blue-500';
      case 'fan':
        return 'text-cyan-500';
      case 'plug':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card className="hover:border-blue-300">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${
            device.status === 'on' ? 'bg-blue-50' : 'bg-gray-50'
          }`}
        >
          <div className={getColor()}>{getIcon()}</div>
        </div>

        <Toggle
          enabled={device.status === 'on'}
          onChange={() => onToggle(device.id)}
        />
      </div>

      <h3 className="font-semibold text-gray-900 text-lg mb-1">
        {device.name}
      </h3>
      <p className="text-sm text-gray-500 mb-3">{device.location}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Power Usage</span>
        <span className="font-semibold text-gray-900">
          {device.powerUsage}W
        </span>
      </div>
    </Card>
  );
}

