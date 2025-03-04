import React, { useState } from 'react';
import { Users, Target, Trophy, Star, Heart, MessageSquare, Bell, UserPlus, CheckCircle, XCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  goals: Goal[];
  achievements: Achievement[];
  streak: number;
}

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  target: number;
  deadline: string;
  supporters: string[];
  updates: Update[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

interface Update {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

const AccountabilityDashboard: React.FC = () => {
  const [connections, setConnections] = useState<User[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      goals: [
        {
          id: '1',
          title: 'Run 5k Marathon',
          category: 'fitness',
          progress: 3.5,
          target: 5,
          deadline: '2024-04-15',
          supporters: ['2', '3'],
          updates: []
        }
      ],
      achievements: [
        {
          id: '1',
          title: '7-Day Streak',
          description: 'Maintained daily workout routine for a week',
          date: '2024-03-10',
          icon: 'trophy'
        }
      ],
      streak: 7
    }
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: '1',
      user: {
        id: '2',
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      message: 'Would like to join your accountability group'
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUpdate, setNewUpdate] = useState('');

  const handleConnect = (userId: string) => {
    // In a real implementation, this would send a connection request
    console.log('Connecting with user:', userId);
  };

  const handleSupportGoal = (userId: string, goalId: string) => {
    // In a real implementation, this would add the current user as a supporter
    console.log('Supporting goal:', goalId);
  };

  const handlePostUpdate = (goalId: string) => {
    if (newUpdate.trim()) {
      // In a real implementation, this would post the update to the backend
      console.log('Posting update for goal:', goalId);
      setNewUpdate('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Connections Overview */}
      <div className="lg:col-span-4 space-y-6">
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800">My Network</h3>
            </div>
            <button className="p-2 bg-indigo-500 text-white rounded-lg">
              <UserPlus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {connections.map(user => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-4 rounded-lg transition-all cursor-pointer ${
                  selectedUser?.id === user.id
                    ? 'bg-indigo-50 border-2 border-indigo-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Trophy className="w-4 h-4" />
                      <span>{user.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests */}
        <div className="dashboard-card">
          <h3 className="font-semibold text-gray-800 mb-4">Pending Requests</h3>
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <div key={request.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={request.user.avatar}
                    alt={request.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium">{request.user.name}</h4>
                    <p className="text-sm text-gray-500">{request.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm">
                    Accept
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed and Goals */}
      <div className="lg:col-span-8 space-y-6">
        {selectedUser ? (
          <>
            {/* User Goals */}
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">
                  {selectedUser.name}'s Goals
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {selectedUser.goals.length} active goals
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedUser.goals.map(goal => (
                  <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{goal.title}</h4>
                      <span className="text-sm text-gray-500">
                        Due {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>
                          {goal.progress}/{goal.target}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-indigo-500 rounded-full"
                          style={{
                            width: `${(goal.progress / goal.target) * 100}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {goal.supporters.map(supporterId => (
                          <img
                            key={supporterId}
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                            alt="Supporter"
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => handleSupportGoal(selectedUser.id, goal.id)}
                        className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm"
                      >
                        Support Goal
                      </button>
                    </div>

                    {/* Updates */}
                    <div className="mt-4 space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newUpdate}
                          onChange={(e) => setNewUpdate(e.target.value)}
                          placeholder="Add an update..."
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                        <button
                          onClick={() => handlePostUpdate(goal.id)}
                          className="px-3 py-2 bg-indigo-500 text-white rounded-lg"
                        >
                          Post
                        </button>
                      </div>

                      {goal.updates.map(update => (
                        <div
                          key={update.id}
                          className="p-3 bg-white rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                              alt="User"
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm font-medium">
                              {connections.find(u => u.id === update.userId)?.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(update.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {update.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="text-sm text-gray-500 hover:text-indigo-500">
                              Like ({update.likes.length})
                            </button>
                            <button className="text-sm text-gray-500 hover:text-indigo-500">
                              Comment ({update.comments.length})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Achievements */}
            <div className="dashboard-card">
              <h3 className="font-semibold text-gray-800 mb-4">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedUser.achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-medium">{achievement.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(achievement.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="dashboard-card">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Select a Connection
              </h3>
              <p className="text-gray-500">
                Choose someone from your network to view their goals and progress
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountabilityDashboard;