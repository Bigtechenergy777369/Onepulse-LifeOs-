import React from 'react';
import { Link2, CheckCircle2, XCircle, RefreshCw, Settings } from 'lucide-react';

interface AppConnection {
  id: string;
  name: string;
  category: 'health' | 'fitness' | 'finance' | 'music' | 'productivity';
  icon: string;
  connected: boolean;
  lastSync?: string;
  status: 'connected' | 'disconnected' | 'error';
  features: string[];
}

interface AppIntegrationProps {
  category: string;
  onConnect: (appId: string) => void;
  onDisconnect: (appId: string) => void;
  onSync: (appId: string) => void;
}

const AppIntegration: React.FC<AppIntegrationProps> = ({
  category,
  onConnect,
  onDisconnect,
  onSync
}) => {
  const apps: AppConnection[] = [
    // Health & Fitness
    {
      id: 'apple-health',
      name: 'Apple Health',
      category: 'health',
      icon: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Activity', 'Heart Rate', 'Sleep', 'Steps']
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      category: 'fitness',
      icon: 'https://images.unsplash.com/photo-1575311373937-040b8e3fd6ce?w=64&h=64&fit=crop',
      connected: true,
      lastSync: '2024-03-15T10:30:00Z',
      status: 'connected',
      features: ['Activity', 'Sleep', 'Heart Rate', 'Exercise']
    },
    {
      id: 'garmin',
      name: 'Garmin',
      category: 'fitness',
      icon: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Activity', 'Heart Rate', 'GPS']
    },
    {
      id: 'strava',
      name: 'Strava',
      category: 'fitness',
      icon: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=64&h=64&fit=crop',
      connected: true,
      lastSync: '2024-03-15T09:45:00Z',
      status: 'connected',
      features: ['Running', 'Cycling', 'GPS Tracking']
    },
    {
      id: 'myfitnesspal',
      name: 'MyFitnessPal',
      category: 'health',
      icon: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Nutrition', 'Calories', 'Meal Planning']
    },

    // Finance
    {
      id: 'plaid',
      name: 'Plaid',
      category: 'finance',
      icon: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Bank Connections', 'Transactions', 'Balances']
    },
    {
      id: 'mint',
      name: 'Mint',
      category: 'finance',
      icon: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Budgeting', 'Bill Tracking', 'Credit Score']
    },
    {
      id: 'ynab',
      name: 'YNAB',
      category: 'finance',
      icon: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Budgeting', 'Goal Tracking', 'Expense Analysis']
    },

    // Music & Mental Wellness
    {
      id: 'spotify',
      name: 'Spotify',
      category: 'music',
      icon: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Playlists', 'Mood Music', 'Meditation Tracks']
    },
    {
      id: 'apple-music',
      name: 'Apple Music',
      category: 'music',
      icon: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=64&h=64&fit=crop',
      connected: false,
      status: 'disconnected',
      features: ['Playlists', 'Mood Music', 'Meditation Tracks']
    }
  ];

  const filteredApps = apps.filter(app => {
    switch (category) {
      case 'physical':
        return app.category === 'health' || app.category === 'fitness';
      case 'mental':
        return app.category === 'music';
      case 'financial':
        return app.category === 'finance';
      default:
        return false;
    }
  });

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Link2 className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Connected Apps</h3>
        </div>
        <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map(app => (
          <div
            key={app.id}
            className="p-4 bg-white rounded-lg border-2 transition-all hover:border-blue-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-10 h-10 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=64&h=64&fit=crop';
                  }}
                />
                <div>
                  <h4 className="font-medium text-gray-900">{app.name}</h4>
                  {app.lastSync && (
                    <p className="text-xs text-gray-500">
                      Last sync: {new Date(app.lastSync).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {app.connected ? (
                  <>
                    <button
                      onClick={() => onSync(app.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Sync data"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDisconnect(app.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Disconnect"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onConnect(app.id)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {app.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>

            {app.connected && (
              <div className="flex items-center gap-2 mt-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Connected</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppIntegration;