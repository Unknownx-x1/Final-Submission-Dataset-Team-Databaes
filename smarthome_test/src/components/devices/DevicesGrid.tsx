import { DeviceCard } from './DeviceCard';
import type { Device } from '../../types';

interface Props {
  devices: Device[];
  onToggle: (deviceId: string) => void;
}

export function DevicesGrid({ devices, onToggle }: Props) {
  // ✅ SAME FILTER USED EVERYWHERE
  const filteredDevices = devices.filter(device =>
    // Living Room: Light + AC
    (device.location === 'Living Room' &&
      (device.type === 'light' || device.type === 'ac')) ||

    // Bedroom: Fan only
    (device.location === 'Bedroom' && device.type === 'fan')
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDevices.map(device => (
        <DeviceCard
          key={device.id}
          device={device}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

