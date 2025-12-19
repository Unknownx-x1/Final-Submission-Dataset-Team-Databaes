import { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { LineChart } from '../ui/Chart';
import { apiService } from '../../services/api';
import type { EnergyData } from '../../types';
import { Zap } from 'lucide-react';

export function EnergyChart() {
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnergyData();
    const interval = setInterval(loadEnergyData, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadEnergyData = async () => {
    try {
      const data = await apiService.getEnergyData();
      setEnergyData(data);
    } catch (error) {
      console.error('Failed to load energy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = () => {
    return energyData.map(d => {
      const date = new Date(d.timestamp);
      return {
        label: date.getHours().toString().padStart(2, '0') + ':00',
        value: d.consumption,
        forecast: d.forecast,
      };
    });
  };

  const currentConsumption = energyData.length > 0 ? energyData[energyData.length - 1].consumption : 0;
  const avgConsumption = energyData.length > 0
    ? energyData.reduce((sum, d) => sum + d.consumption, 0) / energyData.length
    : 0;

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Energy Consumption</h2>
          <p className="text-sm text-gray-500 mt-1">1-hour forecast and actual usage</p>
        </div>
        <div className="text-blue-600 bg-blue-50 p-3 rounded-lg">
          <Zap size={24} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Current Usage</p>
          <p className="text-2xl font-bold text-gray-900">{currentConsumption.toFixed(2)} kWh</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">24h Average</p>
          <p className="text-2xl font-bold text-gray-900">{avgConsumption.toFixed(2)} kWh</p>
        </div>
      </div>

      <LineChart data={formatChartData()} height={280} />

      <div className="flex items-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full" />
          <span className="text-gray-600">Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-gray-400 border-dashed rounded-full" />
          <span className="text-gray-600">Forecast</span>
        </div>
      </div>
    </Card>
  );
}
