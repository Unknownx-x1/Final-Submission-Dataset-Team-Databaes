import { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { apiService } from '../../services/api';
import type { AutomationRule } from '../../types';
import { Sparkles, Clock, Gauge } from 'lucide-react';

export function AutomationRules() {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const data = await apiService.getAutomationRules();
      setRules(data);
    } catch (error) {
      console.error('Failed to load automation rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (ruleId: string) => {
    try {
      const updatedRule = await apiService.toggleAutomationRule(ruleId);
      setRules(rules.map(r => r.id === ruleId ? updatedRule : r));
    } catch (error) {
      console.error('Failed to toggle automation rule:', error);
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'time':
        return <Clock size={18} />;
      case 'sensor':
        return <Gauge size={18} />;
      default:
        return <Sparkles size={18} />;
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Automation Rules</h2>
          <p className="text-sm text-gray-500 mt-1">Manage smart home automation</p>
        </div>
        <div className="text-blue-600 bg-blue-50 p-3 rounded-lg">
          <Sparkles size={24} />
        </div>
      </div>

      <div className="space-y-4">
        {rules.map(rule => (
          <div
            key={rule.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rule.mode === 'ml-assisted'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {rule.mode === 'ml-assisted' ? 'ML-Assisted' : 'Rule-Based'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <div className="text-gray-400">
                    {getTriggerIcon(rule.trigger.type)}
                  </div>
                  <span>When: {rule.trigger.condition}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Then: {rule.action.command}</span>
                </div>
              </div>

              <Toggle
                enabled={rule.enabled}
                onChange={() => handleToggle(rule.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {rules.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <Sparkles size={48} className="mx-auto" />
          </div>
          <p className="text-gray-600">No automation rules configured</p>
        </div>
      )}
    </Card>
  );
}
