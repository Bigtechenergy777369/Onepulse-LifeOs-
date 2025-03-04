import React, { useState, useEffect } from 'react';
import { Settings, Plus, FlipHorizontal as DragHorizontal, Calendar, Clock, Music, Brain, Trophy, Star, 
         Bell, Sparkles, Zap, Shield, Users, ArrowRight, CheckCircle2, XCircle, CalendarClock, 
         Laptop, Watch, Smartphone, Home, Coffee, Dumbbell, Flame, Crown, Gift, Award, 
         MessageSquare, Sun, Moon } from 'lucide-react';

// Enhanced types with integration support
interface Routine {
  id: string;
  name: string;
  type: 'morning' | 'night';
  startTime: string;
  steps: RoutineStep[];
  active: boolean;
  lockScreenTime?: string;
  streak: number;
  level: number;
  xp: number;
  persona?: 'warrior' | 'scholar' | 'creator';
  integrations: {
    calendar?: string[];
    tasks?: string[];
    smartHome?: string[];
  };
  stats: {
    completionRate: number;
    bestTime: string;
    totalTimeSpent: number;
  };
}

interface RoutineStep {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  energyLevel?: number;
  mood?: string;
  dependencies?: string[];
  integrations?: {
    calendar?: string;
    task?: string;
    device?: string;
  };
  soundscape?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ConnectedApp {
  id: string;
  name: string;
  type: 'calendar' | 'task' | 'smart-home';
  icon: any;
  connected: boolean;
  lastSync?: string;
}

interface AICoachMessage {
  id: string;
  type: 'motivation' | 'insight' | 'suggestion';
  content: string;
  timestamp: string;
}

function CustomRoutines() {
  // Existing state
  const [activeRoutine, setActiveRoutine] = useState<'morning' | 'night'>('morning');
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: 'morning-1',
      name: 'Energizing Morning',
      type: 'morning',
      startTime: '06:30',
      active: true,
      streak: 7,
      level: 3,
      xp: 450,
      persona: 'warrior',
      steps: [
        {
          id: 'step-1',
          title: 'Morning Meditation',
          duration: 10,
          completed: false,
          difficulty: 'easy',
          soundscape: 'zen-garden',
          energyLevel: 7,
          mood: 'calm'
        },
        {
          id: 'step-2',
          title: 'Stretching',
          duration: 15,
          completed: false,
          difficulty: 'medium',
          dependencies: ['step-1']
        }
      ],
      integrations: {
        calendar: ['Google Calendar', 'Apple Calendar'],
        tasks: ['Todoist'],
        smartHome: ['Phillips Hue', 'Smart Coffee Maker']
      },
      stats: {
        completionRate: 85,
        bestTime: '45 mins',
        totalTimeSpent: 2160
      }
    }
  ]);

  // New state for enhanced features
  const [connectedApps, setConnectedApps] = useState<ConnectedApp[]>([
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      type: 'calendar',
      icon: Calendar,
      connected: true,
      lastSync: '2024-03-15 10:30'
    },
    {
      id: 'todoist',
      name: 'Todoist',
      type: 'task',
      icon: CheckCircle2,
      connected: true,
      lastSync: '2024-03-15 10:45'
    },
    {
      id: 'smart-home',
      name: 'Smart Home',
      type: 'smart-home',
      icon: Home,
      connected: false
    }
  ]);

  const [aiCoach, setAiCoach] = useState<AICoachMessage[]>([
    {
      id: '1',
      type: 'insight',
      content: 'You complete your morning routine 15% faster when you start before 7 AM',
      timestamp: new Date().toISOString()
    }
  ]);

  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [draggedStep, setDraggedStep] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'hardcore' | 'relaxed'>('relaxed');

  // Handle app connections
  const handleConnectApp = (appId: string) => {
    setConnectedApps(prev =>
      prev.map(app =>
        app.id === appId
          ? { ...app, connected: true, lastSync: new Date().toISOString() }
          : app
      )
    );
  };

  // Handle routine completion
  const handleCompleteStep = (routineId: string, stepId: string) => {
    setRoutines(prev =>
      prev.map(routine =>
        routine.id === routineId
          ? {
              ...routine,
              steps: routine.steps.map(step =>
                step.id === stepId
                  ? { ...step, completed: true }
                  : step
              ),
              xp: routine.xp + 10
            }
          : routine
      )
    );

    // Trigger AI coach response
    setAiCoach(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'motivation',
        content: 'Great work! Keep the momentum going!',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  // Handle drag and drop
  const handleDragStart = (stepId: string) => {
    setDraggedStep(stepId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStepId: string) => {
    if (!draggedStep) return;

    setRoutines(prev =>
      prev.map(routine => ({
        ...routine,
        steps: reorderSteps(routine.steps, draggedStep, targetStepId)
      }))
    );
    setDraggedStep(null);
  };

  const reorderSteps = (steps: RoutineStep[], sourceId: string, targetId: string) => {
    const result = [...steps];
    const sourceIndex = result.findIndex(step => step.id === sourceId);
    const targetIndex = result.findIndex(step => step.id === targetId);
    
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(targetIndex, 0, removed);
    
    return result;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Custom Routines</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setGameMode(prev => prev === 'hardcore' ? 'relaxed' : 'hardcore')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              gameMode === 'hardcore'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {gameMode === 'hardcore' ? <Flame className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
              <span>{gameMode === 'hardcore' ? 'Hardcore Mode' : 'Relaxed Mode'}</span>
            </div>
          </button>
          <button
            onClick={() => setShowIntegrationModal(true)}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Connected Apps Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {connectedApps.map(app => (
          <div
            key={app.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <app.icon className="w-5 h-5 text-gray-600" />
                <div>
                  <h3 className="font-medium text-gray-900">{app.name}</h3>
                  {app.lastSync && (
                    <p className="text-xs text-gray-500">
                      Last sync: {new Date(app.lastSync).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              {app.connected ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              ) : (
                <button
                  onClick={() => handleConnectApp(app.id)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg"
                >
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Routine Type Selector */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveRoutine('morning')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeRoutine === 'morning'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5" />
            <span>Morning</span>
          </div>
        </button>
        <button
          onClick={() => setActiveRoutine('night')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeRoutine === 'night'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            <span>Night</span>
          </div>
        </button>
      </div>

      {/* Active Routines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines
          .filter(routine => routine.type === activeRoutine)
          .map(routine => (
            <div
              key={routine.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              {/* Routine Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{routine.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Starts at {routine.startTime}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Flame className="w-4 h-4" />
                    <span className="font-medium">{routine.streak} streak</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-500">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">Level {routine.level}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Daily Progress</span>
                  <span>{routine.stats.completionRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${routine.stats.completionRate}%` }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {routine.steps.map(step => (
                  <div
                    key={step.id}
                    draggable
                    onDragStart={() => handleDragStart(step.id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(step.id)}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-move"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <DragHorizontal className="w-4 h-4 text-gray-400" />
                        <p className="font-medium text-gray-700">{step.title}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">{step.duration} mins</span>
                        {step.soundscape && (
                          <div className="flex items-center gap-1 text-sm text-indigo-600">
                            <Music className="w-3 h-3" />
                            <span>{step.soundscape}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onChange={() => handleCompleteStep(routine.id, step.id)}
                      className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              {/* Integrations */}
              <div className="mt-4 space-y-2">
                {routine.integrations.calendar && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Synced with {routine.integrations.calendar.join(', ')}</span>
                  </div>
                )}
                {routine.integrations.smartHome && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Home className="w-4 h-4" />
                    <span>Connected to {routine.integrations.smartHome.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* AI Coach Messages */}
              {aiCoach.length > 0 && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-medium text-indigo-900">AI Coach</h4>
                  </div>
                  <div className="space-y-2">
                    {aiCoach.slice(-2).map(message => (
                      <p key={message.id} className="text-sm text-indigo-700">
                        {message.content}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CustomRoutines;