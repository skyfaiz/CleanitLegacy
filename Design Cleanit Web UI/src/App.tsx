import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';

// Pages - Main App
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import AvailableJobsPage from './pages/AvailableJobsPage';
import MyJobsPage from './pages/MyJobsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import CleanTipsFeedPage from './pages/CleanTipsFeedPage';
import CleanTipDetailPage from './pages/CleanTipDetailPage';
import CreateCleanTipPage from './pages/CreateCleanTipPage';

// Pages - Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobVerification from './pages/admin/AdminJobVerification';
import AdminPayouts from './pages/admin/AdminPayouts';
import AdminCleanTips from './pages/admin/AdminCleanTips';

// Context for authentication
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'citizen' | 'cleaner' | 'admin';
  avatar?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => void;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string, role: 'citizen' | 'cleaner') => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role?: string) => {
    // Mock login - in real app would call API
    const mockUser: User = {
      id: '1',
      name: 'Priya Sharma',
      email,
      phone: '+91 98765 43210',
      role: (role as User['role']) || 'citizen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      joinedDate: '2025-01-15',
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, phone: string, password: string, role: 'citizen' | 'cleaner') => {
    const newUser: User = {
      id: Math.random().toString(),
      name,
      email,
      phone,
      role,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected Route Component
function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes - Main App */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
              <Route
                path="/jobs/available"
                element={
                  <ProtectedRoute>
                    <AvailableJobsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/my-jobs"
                element={
                  <ProtectedRoute>
                    <MyJobsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cleantips"
                element={<CleanTipsFeedPage />}
              />
              <Route
                path="/cleantips/:id"
                element={<CleanTipDetailPage />}
              />
              <Route
                path="/cleantips/create"
                element={
                  <ProtectedRoute>
                    <CreateCleanTipPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/campaigns"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminCampaigns />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/verify-jobs"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminJobVerification />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/payouts"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPayouts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/cleantips"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminCleanTips />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}