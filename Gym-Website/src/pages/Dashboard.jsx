import React from 'react';
import { Users, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useScheduleStore } from '../store/scheduleStore';
import Notes from '../components/Notes';

const stats = [
  { name: 'Total Members', value: '2,100', icon: Users, change: '+4.75%' },
  { name: 'Monthly Revenue', value: '$45,000', icon: CreditCard, change: '+54.02%' },
  { name: 'Active Memberships', value: '1,600', icon: TrendingUp, change: '+2.59%' },
  { name: 'Classes Today', value: '12', icon: Calendar, change: 'Same as usual' },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const { schedules } = useScheduleStore();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Welcome back, {user?.name}!
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Here's what's happening at your gym today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Upcoming Classes
            </h3>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {schedules.map((schedule) => (
                  <li key={schedule.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Calendar className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {schedule.title}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {schedule.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          {schedule.date} at {schedule.time}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
                {schedules.length === 0 && (
                  <li className="py-4 text-center text-sm text-gray-500">
                    No upcoming classes scheduled
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <Notes />
      </div>
    </div>
  );
}