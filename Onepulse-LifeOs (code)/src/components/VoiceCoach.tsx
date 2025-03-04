import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Languages, Play, Pause, Settings, Wand2, Brain, Sparkles, BookOpen, MessageSquare, History, Star } from 'lucide-react';

interface Voice {
  id: string;
  name: string;
  language: string;
  accent: string;
  gender: 'male' | 'female';
  age: 'young' | 'middle' | 'mature';
  style: 'casual' | 'professional' | 'friendly';
}

interface Lesson {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  description: string;
  topics: string[];
}

interface VoicePreview {
  audioUrl: string;
  isPlaying: boolean;
}

const VoiceCoach: React.FC = () => {
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentPracticeText, setCurrentPracticeText] = useState('');
  const [voicePreview, setVoicePreview] = useState<VoicePreview | null>(null);
  const [feedback, setFeedback] = useState<{
    pronunciation: number[];
    intonation: number[];
    rhythm: number[];
    timestamp: number;
  } | null>(null);
  const [progress, setProgress] = useState({
    lessonsCompleted: 0,
    totalPracticeTime: 0,
    averageScore: 0,
    streakDays: 5
  });

  const voices: Voice[] = [
    {
      id: 'en-us-sarah',
      name: 'Sarah',
      language: 'English',
      accent: 'American',
      gender: 'female',
      age: 'young',
      style: 'friendly'
    },
    {
      id: 'en-gb-james',
      name: 'James',
      language: 'English',
      accent: 'British',
      gender: 'male',
      age: 'mature',
      style: 'professional'
    },
    {
      id: 'fr-fr-marie',
      name: 'Marie',
      language: 'French',
      accent: 'Parisian',
      gender: 'female',
      age: 'middle',
      style: 'casual'
    },
    {
      id: 'es-es-carlos',
      name: 'Carlos',
      language: 'Spanish',
      accent: 'Castilian',
      gender: 'male',
      age: 'young',
      style: 'friendly'
    }
  ];

  const lessons: Lesson[] = [
    {
      id: 'basic-conversation',
      title: 'Basic Conversation',
      level: 'beginner',
      duration: 15,
      description: 'Learn essential phrases for everyday conversations',
      topics: ['Greetings', 'Small Talk', 'Common Questions']
    },
    {
      id: 'business-english',
      title: 'Business Communication',
      level: 'advanced',
      duration: 30,
      description: 'Master professional communication skills',
      topics: ['Meetings', 'Presentations', 'Negotiations']
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Workshop',
      level: 'intermediate',
      duration: 20,
      description: 'Perfect your accent and pronunciation',
      topics: ['Vowel Sounds', 'Consonants', 'Word Stress']
    }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would initialize the Web Audio API
    // and start recording the user's voice
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real implementation, this would stop recording and send
    // the audio to an AI service for analysis
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    // In a real implementation, this would load the lesson content
    // and prepare the AI coach for interaction
  };

  const handlePreviewVoice = (voice: Voice) => {
    // Simulate loading a voice preview
    setVoicePreview({
      audioUrl: `https://api.example.com/voices/${voice.id}/preview`,
      isPlaying: true
    });
    
    // Simulate stopping after 3 seconds
    setTimeout(() => {
      setVoicePreview(prev => prev ? { ...prev, isPlaying: false } : null);
    }, 3000);
  };

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setFeedback({
          pronunciation: Array(10).fill(0).map(() => Math.random() * 100),
          intonation: Array(10).fill(0).map(() => Math.random() * 100),
          rhythm: Array(10).fill(0).map(() => Math.random() * 100),
          timestamp: Date.now()
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Voice Selection and Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Volume2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800">AI Voice Coach</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {voices.map(voice => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedVoice?.id === voice.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{voice.name}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewVoice(voice);
                        }}
                        className={`p-2 rounded-full ${
                          voicePreview?.isPlaying && selectedVoice?.id === voice.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        {voicePreview?.isPlaying && selectedVoice?.id === voice.id
                          ? <Pause className="w-4 h-4" />
                          : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">{voice.language}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {voice.accent}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {voice.style}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Overview */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Your Progress</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {progress.lessonsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Lessons Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {progress.streakDays}
                  </div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {progress.totalPracticeTime}h
                  </div>
                  <div className="text-sm text-gray-600">Practice Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {progress.averageScore}%
                  </div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
              </div>
            </div>

            {/* Real-time Feedback Visualization */}
            {isRecording && feedback && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Real-time Analysis</h4>
                <div className="space-y-4">
                  {['pronunciation', 'intonation', 'rhythm'].map((metric) => (
                    <div key={metric} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{metric}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {Math.round(feedback[metric][feedback[metric].length - 1])}%
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {feedback[metric].map((value, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-purple-100 rounded-full h-2"
                          >
                            <div
                              className="h-2 rounded-full bg-purple-500 transition-all duration-300"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedVoice && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Practice Mode</h4>
                    <p className="text-sm text-gray-500">Record your voice for feedback</p>
                  </div>
                  <button
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`p-3 rounded-full ${
                      isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
                {isRecording && (
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <Sparkles className="w-4 h-4" />
                    <span>AI is listening and analyzing...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lessons and Practice Area */}
      <div className="lg:col-span-8 space-y-6">
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Language Lessons</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {lessons.map(lesson => (
              <button
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedLesson?.id === lesson.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="text-left">
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{lesson.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      lesson.level === 'beginner' ? 'bg-green-100 text-green-700' :
                      lesson.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {lesson.level}
                    </span>
                    <span className="text-sm text-gray-500">
                      {lesson.duration} mins
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedLesson && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Practice Area</h4>
                <div className="space-y-4">
                  <textarea
                    value={currentPracticeText}
                    onChange={(e) => setCurrentPracticeText(e.target.value)}
                    placeholder="Type or paste text here to practice..."
                    className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    rows={4}
                  />
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Start Practice
                    </button>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                      Get AI Feedback
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Pronunciation Score</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-purple-600">92</div>
                    <div className="text-sm text-gray-500">/ 100</div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Fluency Score</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold text-blue-600">85</div>
                    <div className="text-sm text-gray-500">/ 100</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceCoach;