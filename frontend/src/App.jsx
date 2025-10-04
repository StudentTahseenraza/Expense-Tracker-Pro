// frontend/src/App.jsx
import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Reports";
import Auth from "./pages/Auth";
import AnimatedBackground from "./components/AnimatedBackground";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" />;
};

// Main App Content
const AppContent = () => {
  const { user, logout } = useAuth();
  const navigationItems = [
    { path: "/", label: "Dashboard", emoji: "🏠", description: "Overview" },
    {
      path: "/add",
      label: "Add Expense",
      emoji: "➕",
      description: "New Transaction",
    },
    {
      path: "/reports",
      label: "Reports",
      emoji: "📊",
      description: "Analytics",
    },
  ];

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden text-white bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
      <AnimatedBackground />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="glass-dark"
        progressClassName="bg-gradient-to-r from-blue-500 to-purple-500"
      />

      {/* Header Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full py-3"
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <motion.nav className="flex justify-center flex-1">
              <div className="px-6 py-3 border rounded-full shadow-2xl glass border-white/10 backdrop-blur-xl">
                <div className="flex items-center space-x-6">
                  {navigationItems.map((item) => (
                    <motion.a
                      key={item.path}
                      href={`#${item.path}`}
                      className="relative flex items-center px-4 py-2 space-x-3 text-gray-300 transition-all duration-300 rounded-full group hover:text-white hover:bg-white/5"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {item.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.nav>

            {/* User Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-4"
            >
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <motion.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 pt-4">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
