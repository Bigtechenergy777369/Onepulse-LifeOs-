import React, { useState, useEffect } from 'react';
import { Activity, Heart, Moon, Sun, Calendar, MapPin, Target, Dumbbell, Apple, Brain, ShoppingBag } from 'lucide-react';

interface HealthData {
  steps: number;
  heartRate: number;
  sleep: {
    duration: number;
    quality: number;
    deepSleep: number;
  };
  workouts: {
    planned: Array<{
      id: string;
      type: string;
      time: string;
      duration: number;
      targetAreas: string[];
    }>;
    history: Array<{
      id: string;
      type: string;
      date: string;
      duration: number;
      calories: number;
      targetAreas: string[];
    }>;
  };
  appointments: Array<{
    id: string;
    type: string;
    doctor: string;
    facility: string;
    date: string;
    time: string;
  }>;
}

interface ConnectedApp {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
}

const HealthDashboard: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData>({
    steps: 7532,
    heartRate: 72,
    sleep: {
      duration: 7.5,
      quality: 85,
      deepSleep: 2.5
    },
    workouts: {
      planned: [
        {
          id: '1',
          type: 'HIIT',
          time: '07:00',
          duration: 45,
          targetAreas: ['core', 'legs']
        }
      ],
      history: [
        {
          id: '1',
          type: 'Strength',
          date: '2024-03-14',
          duration: 60,
          calories: 450,
          targetAreas: ['chest', 'back', 'arms']
        }
      ]
    },
    appointments: [
      {
        id: '1',
        type: 'Annual Checkup',
        doctor: 'Dr. Smith',
        facility: 'Health Center',
        date: '2024-03-20',
        time: '14:30'
      }
    ]
  });

  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([
    {
      id: 'fitbit',
      name: 'Fitbit',
      icon: '/icons/fitbit.png',
      connected: true,
      lastSync: '2024-03-15 10:30'
    },
    {
      id: 'apple-health',
      name: 'Apple Health',
      icon: '/icons/apple-health.png',
      connected: false
    },
    {
      id: 'garmin',
      name: 'Garmin',
      icon: '/icons/garmin.png',
      connected: true,
      lastSync: '2024-03-15 10:45'
    }
  ]);

  const [holisticSuggestions, setHolisticSuggestions] = useState({
    herbs: [
      {
        name: 'Ashwagandha',
        benefits: ['Stress Relief', 'Energy', 'Focus'],
        dosage: '500mg daily',
        warning: 'Consult with healthcare provider before use'
      }
    ],
    supplements: [
      {
        name: 'Vitamin D3',
        benefits: ['Immune Support', 'Bone Health'],
        dosage: '2000 IU daily',
        warning: 'Take with food for better absorption'
      }
    ],
    shoppingList: [
      {
        item: 'Organic Ashwagandha Root',
        quantity: '60 capsules',
        source: 'Whole Foods Market',
        price: 24.99
      }
    ]
  });

  const [nearbyProviders, setNearbyProviders] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Holistic Medicine',
      distance: '2.3 miles',
      rating: 4.8,
      nextAvailable: '2024-03-18'
    }
  ]);

  const handleConnectApp = (appId: string) => {
    // In a real implementation, this would open the OAuth flow
    setConnectedApps(prev =>
      prev.map(app =>
        app.id === appId
          ? { ...app, connected: true, lastSync: new Date().toISOString() }
          : app
      )
    );
  };

  const handleAddToShoppingList = (item: any) => {
    // In a real implementation, this would add to a persistent shopping list
    console.log('Added to shopping list:', item);
  };

  const renderBodyHeatMap = () => {
    // This would render an SVG heat map showing targeted workout areas
    return (
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <img
          src="/images/body-outline.svg"
          alt="Body Heat Map"
          className="w-full h-full object-contain"
        />
        {/* Add heat map overlay based on workout data */}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Connected Apps */}
      <div className="lg:col-span-3">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Connected Apps</h3>
          <div className="space-y-4">
            {connectedApps.map(app => (
              <div
                key={app.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{app.name}</h4>
                    {app.connected && app.lastSync && (
                      <p className="text-xs text-gray-500">
                        Last sync: {new Date(app.lastSync).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                {!app.connected && (
                  <button
                    onClick={() => handleConnectApp(app.id)}
                    className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-lg"
                  >
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Health Data */}
      <div className="lg:col-span-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-green-500" />
              <h3 className="font-medium">Steps</h3>
            </div>
            <p className="text-2xl font-bold">{healthData.steps}</p>
            <div className="mt-2 h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${(healthData.steps / 10000) * 100}%` }}
              />
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-medium">Heart Rate</h3>
            </div>
            <p className="text-2xl font-bold">{healthData.heartRate} bpm</p>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium">Sleep</h3>
            </div>
            <p className="text-2xl font-bold">{healthData.sleep.duration}h</p>
            <p className="text-sm text-gray-500">
              Deep sleep: {healthData.sleep.deepSleep}h
            </p>
          </div>
        </div>

        {/* Workout Plan and History */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Workout Plan</h3>
            <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg">
              Add Workout
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Today's Plan</h4>
              {healthData.workouts.planned.map(workout => (
                <div
                  key={workout.id}
                  className="p-3 bg-gray-50 rounded-lg mb-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{workout.type}</h5>
                    <span className="text-sm text-gray-500">{workout.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{workout.duration} min</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {workout.targetAreas.map(area => (
                      <span
                        key={area}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>{renderBodyHeatMap()}</div>
          </div>
        </div>
      </div>

      {/* Holistic Health and Appointments */}
      <div className="lg:col-span-3 space-y-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Holistic Suggestions</h3>
          <div className="space-y-4">
            {holisticSuggestions.herbs.map(herb => (
              <div key={herb.name} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">{herb.name}</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {herb.benefits.map(benefit => (
                    <span
                      key={benefit}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Dosage: {herb.dosage}
                </p>
                <button
                  onClick={() => handleAddToShoppingList(herb)}
                  className="w-full px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm"
                >
                  Add to Shopping List
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Nearby Providers</h3>
          <div className="space-y-4">
            {nearbyProviders.map(provider => (
              <div key={provider.id} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium">{provider.name}</h4>
                <p className="text-sm text-gray-600">{provider.specialty}</p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {provider.distance}
                  </span>
                </div>
                <div className="mt-2">
                  <button className="w-full px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;