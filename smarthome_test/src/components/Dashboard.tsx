import { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import type { Device } from '../types';

import { DashboardStatsSection } from './dashboard/DashboardStats';
import { DevicesGrid } from './devices/DevicesGrid';

export function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    const data = await apiService.getDevices();
    setDevices(data);
    setLoading(false);
  };

  const handleToggle = async (deviceId: string) => {
    const updated = await apiService.toggleDevice(deviceId);
    setDevices(prev =>
      prev.map(d => (d.id === deviceId ? updated : d))
    );
  };

  return (
    <div className="space-y-10">
      <DashboardStatsSection devices={devices} loading={loading} />
      <DevicesGrid devices={devices} onToggle={handleToggle} />
    </div>
  );
}
