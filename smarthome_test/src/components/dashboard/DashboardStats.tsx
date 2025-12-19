import { useEffect, useState } from 'react';
import { StatCard } from '../ui/Card';
import { apiService } from '../../services/api';
import type { Device } from '../../types';
import { Zap, Power, Activity } from 'lucide-react';

export function DashboardStatsSection() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
    const interval = setInterval(loadDevices, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDevices = async () => {
    try {
      const data = await apiService.getDevices();

      // ✅ KEEP ONLY THE 3 DEVICES YOU SHOW
      const filtered = data.filter(device =>
        (device.name === 'Living Room Light' && device.location === 'Living Room') ||
        (device.name === 'Main AC' && device.location === 'Living Room') ||
        (device.name === 'Ceiling Fan' && device.location === 'Bedroom')
      );

      setDevices(filtered);
    } catch (error) {
      console.error('Failed to load devices:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-100 rounded-xl h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  // ✅ DERIVE STATS FROM FILTERED DEVICES
  const totalDevices = devices.length;
  const activeDevices = devices.filter(d => d.status === 'on').length;
  const totalEnergy = devices.reduce((sum, d) => sum + d.powerUsage, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Devices"
        value={totalDevices}
        subtitle={`${activeDevices} active`}
        icon={<Power size={24} />}
      />

      <StatCard
        title="Active Devices"
        value={activeDevices}
        subtitle={
          totalDevices > 0
            ? `${Math.round((activeDevices / totalDevices) * 100)}% of total`
            : '0%'
        }
        icon={<Activity size={24} />}
      />

      <StatCard
        title="Energy Usage"
        value={`${totalEnergy.toFixed(0)} W`}
        subtitle="Current consumption"
        icon={<Zap size={24} />}
      />
    </div>
  );
}
