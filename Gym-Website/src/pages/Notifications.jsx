import React from 'react';
import { Bell, Check } from 'lucide-react';

const notifications = [
  {
    id: '1',
    userId: '1',
    title: 'Payment Reminder',
    message: 'Your membership fee is due in 3 days',
    type: 'payment',
    read: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    title: 'New Class Schedule',
    message: 'Check out our new yoga classes starting next week',
    type: 'announcement',
    read: true,
    createdAt: new Date(Date.now() - 86400000),
  },
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-500">
          Mark all as read
        </button>
      </div>

      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {notifications.map((notification, idx) => (
            <li key={notification.id}>
              <div className="relative pb-8">
                {idx !== notifications.length - 1 ? (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className={`relative p-2 rounded-full ${
                    notification.read ? 'bg-gray-100' : 'bg-indigo-100'
                  }`}>
                    <Bell className={`h-5 w-5 ${
                      notification.read ? 'text-gray-400' : 'text-indigo-500'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 self-center">
                      <button className="text-indigo-600 hover:text-indigo-500">
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}