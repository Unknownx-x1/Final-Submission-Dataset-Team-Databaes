export interface Device {
  id: string;
  name: string;
  type: 'light' | 'ac' | 'fan' | 'plug';
  status: 'on' | 'off';
  location: string;
  powerUsage: number;
  brightness?: number;
  temperature?: number;
  speed?: number;
}

export interface Sensor {
  id: string;
  type: 'temperature' | 'humidity' | 'occupancy';
  location: string;
  value: number;
  unit: string;
  lastUpdated: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface EnergyData {
  timestamp: string;
  consumption: number;
  forecast?: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: {
    type: 'sensor' | 'time' | 'device';
    condition: string;
  };
  action: {
    deviceId: string;
    command: string;
  };
  mode: 'rule-based' | 'ml-assisted';
}

export interface DashboardStats {
  totalDevices: number;
  activeDevices: number;
  totalEnergy: number;
  estimatedCost: number;
}
