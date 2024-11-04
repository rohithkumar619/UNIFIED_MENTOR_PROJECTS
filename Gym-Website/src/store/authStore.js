import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Initialize admin credentials if not exists
const initializeAdmin = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (!users.some(user => user.email === 'admin@gmail.com')) {
    users.push({
      email: 'admin@gmail.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin'
    });
    localStorage.setItem('users', JSON.stringify(users));
  }
};

initializeAdmin();

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (credentials) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
          set({ user: { ...user, password: undefined }, isAuthenticated: true });
          return true;
        }
        return false;
      },
      signup: (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.email === userData.email)) {
          return false;
        }
        const newUser = { ...userData, role: 'user' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        set({ user: { ...newUser, password: undefined }, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);