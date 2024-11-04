import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useScheduleStore = create(
  persist(
    (set, get) => ({
      schedules: [],
      addSchedule: (schedule) => {
        set({ schedules: [...get().schedules, { ...schedule, id: Date.now() }] });
      },
      deleteSchedule: (id) => {
        set({ schedules: get().schedules.filter(schedule => schedule.id !== id) });
      },
    }),
    {
      name: 'schedule-storage',
    }
  )
);