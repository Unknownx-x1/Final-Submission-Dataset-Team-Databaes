import type { Device, Sensor, EnergyData, AutomationRule, DashboardStats } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const mockDevices: Device[] = [
  { id: '1', name: 'Living Room Light', type: 'light', status: 'on', location: 'Living Room', powerUsage: 15, brightness: 80 },
  { id: '2', name: 'Bedroom Light', type: 'light', status: 'off', location: 'Bedroom', powerUsage: 0, brightness: 0 },
  { id: '3', name: 'Main AC', type: 'ac', status: 'on', location: 'Living Room', powerUsage: 1500, temperature: 22 },
  { id: '4', name: 'Bedroom AC', type: 'ac', status: 'off', location: 'Bedroom', powerUsage: 0, temperature: 24 },
  { id: '5', name: 'Ceiling Fan', type: 'fan', status: 'on', location: 'Bedroom', powerUsage: 75, speed: 3 },
  { id: '6', name: 'Kitchen Plug', type: 'plug', status: 'on', location: 'Kitchen', powerUsage: 120 },
];

const mockSensors: Sensor[] = [
  { id: 's1', type: 'temperature', location: 'Living Room', value: 23.5, unit: '°C', lastUpdated: new Date().toISOString(), status: 'normal' },
  { id: 's2', type: 'temperature', location: 'Bedroom', value: 25.2, unit: '°C', lastUpdated: new Date().toISOString(), status: 'warning' },
  { id: 's3', type: 'humidity', location: 'Living Room', value: 65, unit: '%', lastUpdated: new Date().toISOString(), status: 'normal' },
  { id: 's4', type: 'humidity', location: 'Bedroom', value: 58, unit: '%', lastUpdated: new Date().toISOString(), status: 'normal' },
  { id: 's5', type: 'occupancy', location: 'Living Room', value: 1, unit: 'person', lastUpdated: new Date().toISOString(), status: 'normal' },
  { id: 's6', type: 'occupancy', location: 'Bedroom', value: 0, unit: 'person', lastUpdated: new Date().toISOString(), status: 'normal' },
];

const generateEnergyData = (): EnergyData[] => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    const consumption = Math.random() * 3 + 1;
    const forecast = consumption + (Math.random() - 0.5) * 0.5;
    return {
      timestamp: timestamp.toISOString(),
      consumption,
      forecast: i > 18 ? forecast : undefined,
    };
  });
};

const mockAutomationRules: AutomationRule[] = [
  {
    id: 'r1',
    name: 'Night Mode',
    enabled: true,
    trigger: { type: 'time', condition: 'After 10:00 PM' },
    action: { deviceId: '1', command: 'Turn off all lights' },
    mode: 'rule-based',
  },
  {
    id: 'r2',
    name: 'Climate Control',
    enabled: true,
    trigger: { type: 'sensor', condition: 'Temperature > 26°C' },
    action: { deviceId: '3', command: 'Turn on AC' },
    mode: 'ml-assisted',
  },
  {
    id: 'r3',
    name: 'Away Mode',
    enabled: false,
    trigger: { type: 'sensor', condition: 'No occupancy for 30 min' },
    action: { deviceId: '0', command: 'Turn off all devices' },
    mode: 'rule-based',
  },
];

export const apiService = {
  async getDevices(): Promise<Device[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/devices`);
      return await response.json();
    } catch {
      return mockDevices;
    }
  },

  async toggleDevice(deviceId: string): Promise<Device> {
    try {
      const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/toggle`, {
        method: 'POST',
      });
      return await response.json();
    } catch {
      const device = mockDevices.find(d => d.id === deviceId);
      if (device) {
        device.status = device.status === 'on' ? 'off' : 'on';
        device.powerUsage = device.status === 'on' ? (device.type === 'ac' ? 1500 : device.type === 'fan' ? 75 : device.type === 'plug' ? 120 : 15) : 0;
      }
      return device!;
    }
  },

  async updateDevice(deviceId: string, updates: Partial<Device>): Promise<Device> {
    try {
      const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return await response.json();
    } catch {
      const device = mockDevices.find(d => d.id === deviceId);
      if (device) {
        Object.assign(device, updates);
      }
      return device!;
    }
  },

  async getSensors(): Promise<Sensor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sensors`);
      return await response.json();
    } catch {
      return mockSensors;
    }
  },

  async getEnergyData(): Promise<EnergyData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/energy`);
      return await response.json();
    } catch {
      return generateEnergyData();
    }
  },

  async getAutomationRules(): Promise<AutomationRule[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/rules`);
      return await response.json();
    } catch {
      return mockAutomationRules;
    }
  },

  async toggleAutomationRule(ruleId: string): Promise<AutomationRule> {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/rules/${ruleId}/toggle`, {
        method: 'POST',
      });
      return await response.json();
    } catch {
      const rule = mockAutomationRules.find(r => r.id === ruleId);
      if (rule) {
        rule.enabled = !rule.enabled;
      }
      return rule!;
    }
  },

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      return await response.json();
    } catch {
      const devices = await this.getDevices();
      const activeDevices = devices.filter(d => d.status === 'on').length;
      const totalEnergy = devices.reduce((sum, d) => sum + d.powerUsage, 0);
      return {
        totalDevices: devices.length,
        activeDevices,
        totalEnergy: totalEnergy / 1000,
        estimatedCost: (totalEnergy / 1000) * 0.12,
      };
    }
  },
};
