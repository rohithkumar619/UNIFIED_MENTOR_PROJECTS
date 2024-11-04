import React from 'react';
import { Clock } from 'lucide-react';

export default function Schedule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gym Schedule</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <div key={day} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{day}</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">Opening Hours</p>
              <p className="text-base font-medium text-gray-900">6:00 AM - 10:00 PM</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}