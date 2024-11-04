import React, { useState } from 'react';
import { useScheduleStore } from '../store/scheduleStore';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const { schedules, addSchedule, deleteSchedule } = useScheduleStore();
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    description: '',
    time: '',
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addSchedule(newSchedule);
    setNewSchedule({ title: '', description: '', time: '', date: '' });
    toast.success('Schedule added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Add New Schedule
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newSchedule.title}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={newSchedule.description}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={newSchedule.date}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, date: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                value={newSchedule.time}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, time: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Schedule
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Current Schedules
        </h3>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {schedule.title}
                </h4>
                <p className="text-sm text-gray-500">{schedule.description}</p>
                <p className="text-xs text-gray-400">
                  {schedule.date} at {schedule.time}
                </p>
              </div>
              <button
                onClick={() => {
                  deleteSchedule(schedule.id);
                  toast.success('Schedule deleted successfully!');
                }}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
          {schedules.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No schedules added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
