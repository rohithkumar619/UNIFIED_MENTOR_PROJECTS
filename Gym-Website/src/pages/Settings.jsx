import React from 'react';
import { User, Bell, Shield, Clock } from 'lucide-react';

const settings = [
  {
    id: 'profile',
    name: 'Profile Settings',
    description: 'Update your personal information and preferences',
    icon: User,
  },
  {
    id: 'notifications',
    name: 'Notification Preferences',
    description: 'Configure how you receive notifications',
    icon: Bell,
  },
  {
    id: 'privacy',
    name: 'Privacy & Security',
    description: 'Manage your account security and privacy settings',
    icon: Shield,
  },
  {
    id: 'schedule',
    name: 'Schedule Preferences',
    description: 'Set your preferred workout times and reminders',
    icon: Clock,
  },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="relative rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <setting.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {setting.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {setting.description}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Configure →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}