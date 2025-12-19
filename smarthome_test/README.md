# Smart Home Automation & Energy Monitoring Dashboard

A modern, responsive frontend dashboard for monitoring and controlling smart home devices, sensors, and energy consumption.

## Features

### Device Control
- Real-time control of smart home devices (lights, AC units, fans, and smart plugs)
- Interactive controls with sliders for brightness, temperature, and fan speed
- Power usage monitoring for each device
- Toggle switches for quick on/off control

### Sensor Monitoring
- Real-time environmental data display (temperature, humidity, occupancy)
- Status indicators (normal, warning, critical)
- Automatic refresh every 30 seconds
- Location-based sensor organization

### Energy Consumption
- 24-hour energy consumption visualization
- Hourly forecast display with ML predictions
- Current usage and 24-hour average metrics
- Interactive line chart with actual vs. forecast data

### Automation Rules
- Rule-based and ML-assisted automation management
- Enable/disable automation rules with toggle switches
- Clear trigger conditions and actions display
- Time-based, sensor-based, and device-based triggers

### Dashboard Statistics
- Total and active device counts
- Real-time energy usage tracking
- Estimated cost calculation
- Clean, card-based statistics layout

## Technology Stack

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful, consistent icons

## Project Structure

```
src/
├── components/
│   ├── automation/      # Automation rules components
│   ├── dashboard/       # Dashboard statistics
│   ├── devices/         # Device control components
│   ├── energy/          # Energy consumption charts
│   ├── layout/          # Header and layout components
│   ├── sensors/         # Sensor monitoring components
│   └── ui/              # Reusable UI components (Card, Button, Toggle, Chart)
├── services/
│   └── api.ts          # API service layer with mock data
├── types/
│   └── index.ts        # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and animations
```

## API Integration

The dashboard is designed to work with your existing Python Flask/FastAPI backend. The API service layer (`src/services/api.ts`) includes:

- Mock data for development and testing
- Automatic fallback when backend is unavailable
- Easy configuration via environment variables

### Backend Endpoints Expected

- `GET /api/devices` - List all devices
- `POST /api/devices/:id/toggle` - Toggle device on/off
- `PATCH /api/devices/:id` - Update device settings
- `GET /api/sensors` - Get sensor readings
- `GET /api/energy` - Get energy consumption data
- `GET /api/automation/rules` - List automation rules
- `POST /api/automation/rules/:id/toggle` - Toggle rule status
- `GET /api/dashboard/stats` - Get dashboard statistics

### Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

If no backend is available, the dashboard will use mock data automatically.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1280px - 1919px)
- Tablet (768px - 1279px)
- Mobile (below 768px)

## Features Highlights

### Real-time Updates
- Sensors refresh every 30 seconds
- Energy data updates every minute
- Dashboard statistics update every 30 seconds

### Interactive Controls
- Smooth toggle animations
- Range sliders for fine-grained control
- Hover states and transitions
- Loading states with skeleton screens

### Professional Design
- Clean, modern interface
- Consistent color palette (blue primary theme)
- Proper spacing and typography
- Accessible contrast ratios
- Premium card-based layout

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
