import React, { useState } from 'react';
import { Brain, Heart, Music, BookOpen, MessageSquare, Calendar, Star } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: number;
  tags: string[];
  images?: string[];
}

interface MoodData {
  date: string;
  value: number;
  note?: string;
}

interface Playlist {
  id: string;
  name: string;
  mood: string;
  platform: 'spotify' | 'apple';
  uri: string;
}

interface TherapyResource {
  id: string;
  type: 'therapist' | 'counselor' | 'book' | 'audio';
  name: string;
  specialty?: string;
  rating?: number;
  distance?: string;
  price?: string;
  description: string;
  tags: string[];
}

const MentalWellnessDashboard: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-03-15',
      content: 'Today was a productive day...',
      mood: 8,
      tags: ['work', 'achievement']
    }
  ]);

  const [moodHistory, setMoodHistory] = useState<MoodData[]>([
    { date: '2024-03-15', value: 8 },
    { date: '2024-03-14', value: 7 },
    { date: '2024-03-13', value: 6 }
  ]);

  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Calm & Focused',
      mood: 'calm',
      platform: 'spotify',
      uri: 'spotify:playlist:123'
    },
    {
      id: '2',
      name: 'Energy Boost',
      mood: 'energetic',
      platform: 'spotify',
      uri: 'spotify:playlist:456'
    }
  ]);

  const [resources, setResources] = useState<TherapyResource[]>([
    {
      id: '1',
      type: 'therapist',
      name: 'Dr. Sarah Johnson',
      specialty: 'Anxiety & Depression',
      rating: 4.8,
      distance: '2.3 miles',
      price: '$150/session',
      description: 'Specializing in cognitive behavioral therapy...',
      tags: ['anxiety', 'depression', 'CBT']
    }
  ]);

  const [currentMood, setCurrentMood] = useState<number>(7);
  const [journalText, setJournalText] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const handleMoodChange = (value: number) => {
    setCurrentMood(value);
    setMoodHistory(prev => [
      { date: new Date().toISOString(), value },
      ...prev
    ]);
  };

  const handleJournalSubmit = () => {
    if (journalText.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        content: journalText,
        mood: currentMood,
        tags: [] // Add tag detection logic
      };
      setJournalEntries(prev => [newEntry, ...prev]);
      setJournalText('');
    }
  };

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    // In a real implementation, this would integrate with Spotify/Apple Music API
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Mood Tracker */}
      <div className="lg:col-span-4">
        <div className="dashboard-card">
          <h3 className="text-lg font-semib old mb-4">Daily Check-in</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                  <button
                    key={value}
                    onClick={() => handleMoodChange(value)}
                    className={`w-8 h-8 rounded-full ${
                      currentMood === value
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Mood History</h4>
              <div className="space-y-2">
                {moodHistory.slice(0, 7).map(mood => (
                  <div
                    key={mood.date}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">
                      {new Date(mood.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          mood.value >= 7
                            ? 'bg-green-500'
                            : mood.value >= 4
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{mood.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journaling */}
      <div className="lg:col-span-8">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Journal</h3>
            <button
              onClick={() => {/* Toggle photo upload */}}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write your thoughts..."
              className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-200"
            />

            <div className="flex justify-end">
              <button
                onClick={handleJournalSubmit}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
              >
                Save Entry
              </button>
            </div>

            <div className="space-y-4">
              {journalEntries.map(entry => (
                <div
                  key={entry.id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          entry.mood >= 7
                            ? 'bg-green-500'
                            : entry.mood >= 4
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{entry.mood}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{entry.content}</p>
                  {entry.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {entry.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Music Therapy */}
      <div className="lg:col-span-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Mood-Enhancing Music</h3>
          <div className="grid grid-cols-2 gap-4">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                onClick={() => handlePlaylistSelect(playlist)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPlaylist?.id === playlist.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-indigo-500" />
                  <div className="text-left">
                    <h4 className="font-medium">{playlist.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">
                      {playlist.mood}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Resources */}
      <div className="lg:col-span-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>
          <div className="space-y-4">
            {resources.map(resource => (
              <div
                key={resource.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-gray-500">{resource.specialty}</p>
                  </div>
                  {resource.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {resource.rating}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {resource.description}
                </p>
                {resource.type === 'therapist' && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">
                      {resource.distance} • {resource.price}
                    </span>
                    <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm">
                      Book Session
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalWellnessDashboard;