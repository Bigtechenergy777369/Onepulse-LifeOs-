import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, User, Bell, Lock, 
  Palette, Shirt, Crown, Sparkles, Camera, 
  Scale, Ruler, Activity, Heart, Eye, 
  Shield, Volume2, Languages, HelpCircle
} from 'lucide-react';

interface AvatarSettings {
  height: number;
  weight: number;
  bodyType: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  facialHair: string;
  outfit: string;
  accessories: string[];
}

function Settings() {
  const [activeTab, setActiveTab] = useState('avatar');
  const [avatarSettings, setAvatarSettings] = useState<AvatarSettings>({
    height: 180,
    weight: 75,
    bodyType: 'athletic',
    skinTone: 'medium',
    hairStyle: 'short',
    hairColor: 'black',
    facialHair: 'none',
    outfit: 'suit',
    accessories: ['glasses']
  });

  const settingsTabs = [
    { id: 'avatar', icon: User, label: 'Avatar Customization' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'privacy', icon: Lock, label: 'Privacy & Security' },
    { id: 'preferences', icon: Palette, label: 'Preferences' }
  ];

  const avatarCustomizationSections = [
    {
      title: 'Physical Attributes',
      icon: Scale,
      settings: [
        {
          id: 'height',
          label: 'Height (cm)',
          type: 'range',
          min: 150,
          max: 200,
          step: 1
        },
        {
          id: 'weight',
          label: 'Weight (kg)',
          type: 'range',
          min: 45,
          max: 120,
          step: 1
        },
        {
          id: 'bodyType',
          label: 'Body Type',
          type: 'select',
          options: ['slim', 'athletic', 'muscular', 'regular']
        }
      ]
    },
    {
      title: 'Appearance',
      icon: Sparkles,
      settings: [
        {
          id: 'skinTone',
          label: 'Skin Tone',
          type: 'color',
          options: [
            { id: 'light', color: '#FFE0BD' },
            { id: 'medium', color: '#F1C27D' },
            { id: 'dark', color: '#8D5524' }
          ]
        },
        {
          id: 'hairStyle',
          label: 'Hair Style',
          type: 'select',
          options: ['short', 'medium', 'long', 'bald']
        },
        {
          id: 'hairColor',
          label: 'Hair Color',
          type: 'color',
          options: [
            { id: 'black', color: '#000000' },
            { id: 'brown', color: '#4A3728' },
            { id: 'blonde', color: '#E6BE8A' },
            { id: 'gray', color: '#808080' }
          ]
        },
        {
          id: 'facialHair',
          label: 'Facial Hair',
          type: 'select',
          options: ['none', 'stubble', 'beard', 'goatee']
        }
      ]
    },
    {
      title: 'Outfit',
      icon: Shirt,
      settings: [
        {
          id: 'outfit',
          label: 'Style',
          type: 'select',
          options: ['casual', 'business', 'formal', 'sporty']
        }
      ]
    }
  ];

  const handleSettingChange = (settingId: string, value: any) => {
    setAvatarSettings(prev => ({
      ...prev,
      [settingId]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <button className="tab-button tab-button-inactive">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {settingsTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === 'avatar' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Avatar Preview */}
                <div className="dashboard-card">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Avatar Preview</h2>
                  <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src="https://models.readyplayer.me/64c9c3b39b792e85c1f81e1f.glb"
                      alt="Full Body Avatar"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Customization Options */}
                <div className="space-y-8">
                  {avatarCustomizationSections.map(section => (
                    <div key={section.title} className="dashboard-card">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <section.icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {section.title}
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {section.settings.map(setting => (
                          <div key={setting.id} className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              {setting.label}
                            </label>
                            
                            {setting.type === 'range' && (
                              <div className="flex items-center gap-4">
                                <input
                                  type="range"
                                  min={setting.min}
                                  max={setting.max}
                                  step={setting.step}
                                  value={avatarSettings[setting.id]}
                                  onChange={(e) => handleSettingChange(setting.id, Number(e.target.value))}
                                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-sm text-gray-600 min-w-[4rem] text-right">
                                  {avatarSettings[setting.id]} {setting.id === 'height' ? 'cm' : 'kg'}
                                </span>
                              </div>
                            )}

                            {setting.type === 'select' && (
                              <select
                                value={avatarSettings[setting.id]}
                                onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all duration-300"
                              >
                                {setting.options.map(option => (
                                  <option key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                  </option>
                                ))}
                              </select>
                            )}

                            {setting.type === 'color' && (
                              <div className="flex flex-wrap gap-3">
                                {setting.options.map(option => (
                                  <button
                                    key={option.id}
                                    onClick={() => handleSettingChange(setting.id, option.id)}
                                    className={`w-10 h-10 rounded-xl transition-all duration-300 ${
                                      avatarSettings[setting.id] === option.id
                                        ? 'ring-2 ring-indigo-500 ring-offset-2'
                                        : ''
                                    }`}
                                    style={{ backgroundColor: option.color }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="dashboard-card">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                {/* Add notification settings here */}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="dashboard-card">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy & Security Settings</h2>
                {/* Add privacy settings here */}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="dashboard-card">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">App Preferences</h2>
                {/* Add general preferences here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;