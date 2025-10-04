import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, Calendar, DollarSign } from 'lucide-react';

const ExpenseSummary = ({ summary, loading }) => {
  if (loading || !summary) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 glass-dark rounded-2xl animate-pulse">
            <div className="w-1/2 h-4 mb-4 bg-gray-600 rounded"></div>
            <div className="w-3/4 h-8 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const { total, byCategory = [], byMonth = [] } = summary;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryColor = (index) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-gray-500 to-slate-500'
    ];
    return colors[index % colors.length];
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Food: '🍔',
      Travel: '✈️',
      Rent: '🏠',
      Bills: '📱',
      Shopping: '🛍️',
      Entertainment: '🎬',
      Healthcare: '🏥',
      Education: '📚',
      Other: '📦'
    };
    return icons[category] || '📦';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Spent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative p-6 overflow-hidden glass-dark rounded-2xl group"
        >
          <div className="absolute inset-0 transition-transform duration-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">Total Spent</h3>
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <motion.p 
              className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {formatAmount(total)}
            </motion.p>
            <p className="flex items-center mt-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              All time expenses
            </p>
          </div>
        </motion.div>

        {/* Categories Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative p-6 overflow-hidden glass-dark rounded-2xl group"
        >
          <div className="absolute inset-0 transition-transform duration-500 bg-gradient-to-br from-green-500/10 to-emerald-500/10 group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">Categories</h3>
              <PieChart className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
              {byCategory.length}
            </p>
            <p className="mt-2 text-sm text-gray-400">Active categories</p>
          </div>
        </motion.div>

        {/* Monthly Average */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative p-6 overflow-hidden glass-dark rounded-2xl group"
        >
          <div className="absolute inset-0 transition-transform duration-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">Monthly Avg</h3>
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              {formatAmount(byMonth.length > 0 ? total / byMonth.length : 0)}
            </p>
            <p className="mt-2 text-sm text-gray-400">Based on {byMonth.length} months</p>
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 glass-dark rounded-2xl"
      >
        <h3 className="flex items-center mb-6 text-lg font-semibold text-white">
          <PieChart className="w-5 h-5 mr-2 text-blue-400" />
          Spending by Category
        </h3>
        
        <div className="space-y-4">
          {byCategory.map((item, index) => {
            const percentage = total > 0 ? (item.total / total) * 100 : 0;
            
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 transition-colors bg-dark-400 rounded-xl hover:bg-dark-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(index)} flex items-center justify-center text-white text-lg`}>
                    {getCategoryIcon(item._id)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{item._id}</h4>
                    <p className="text-sm text-gray-400">{item.count} transactions</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-white">{formatAmount(item.total)}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-600 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.2 * index, duration: 1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(index)}`}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-400">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ExpenseSummary;