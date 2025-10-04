import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from '../components/Login';
import Register from '../components/Register';
import AnimatedBackground from '../components/AnimatedBackground';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
      <AnimatedBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-6xl font-bold text-transparent md:text-7xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
              Expense Tracker Pro
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              {isLogin ? 'Welcome back! Sign in to continue.' : 'Join us to take control of your finances!'}
            </p>
          </motion.div>

          {/* Auth Form */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <Login key="login" onToggleMode={() => setIsLogin(false)} />
              ) : (
                <Register key="register" onToggleMode={() => setIsLogin(true)} />
              )}
            </AnimatePresence>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-12 md:grid-cols-3"
          >
            {[
              { icon: '📊', title: 'Smart Analytics', desc: 'Beautiful charts and insights' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your data is protected' },
              { icon: '📱', title: 'Always Available', desc: 'Access anywhere, anytime' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 text-center glass-dark rounded-2xl"
              >
                <div className="mb-2 text-3xl">{feature.icon}</div>
                <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;