import { useEffect, useState } from 'react';
import { SensorCard } from './SensorCard';
import { apiService } from '../../services/api';
import type { Sensor } from '../../types';

export function SensorsGrid() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSensors();
    const interval = setInterval(loadSensors, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSensors = async () => {
    try {
      const data = await apiService.getSensors();
      setSensors(data);
    } catch (error) {
      console.error('Failed to load sensors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-100 rounded-xl h-40 animate-pulse" />
        ))}
      </div>
    );
  }

  // ✅ REMOVE OCCUPANCY SENSORS
  const filteredSensors = sensors.filter(
    sensor => sensor.type !== 'occupancy'
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSensors.map(sensor => (
        <SensorCard key={sensor.id} sensor={sensor} />
      ))}
    </div>
  );
}
