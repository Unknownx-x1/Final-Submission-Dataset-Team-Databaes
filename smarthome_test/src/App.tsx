import { Header } from './components/layout/Header';
import { Dashboard } from './components/Dashboard';

import { SensorsGrid } from './components/sensors/SensorsGrid';
import { EnergyChart } from './components/energy/EnergyChart';
import { AutomationRules } from './components/automation/AutomationRules';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">

          {/* ✅ DASHBOARD (STATS + DEVICES SHARE STATE) */}
          <section>
            <Dashboard />
          </section>

          {/* ✅ SENSORS */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Sensors</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Real-time environmental monitoring
                </p>
              </div>
            </div>
            <SensorsGrid />
          </section>

          {/* ✅ ENERGY + AUTOMATION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
              <EnergyChart />
            </section>

            <section>
              <AutomationRules />
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;

