import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Search, Filter, X, Calendar } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const categories = ['All', 'Food', 'Travel', 'Rent', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Other'];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    const matchesDate = !dateFilter || expense.date.split('T')[0] === dateFilter;
    
    return matchesSearch && matchesCategory && matchesDate;
  });

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

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'from-green-500 to-emerald-500',
      Travel: 'from-blue-500 to-cyan-500',
      Rent: 'from-purple-500 to-pink-500',
      Bills: 'from-yellow-500 to-orange-500',
      Shopping: 'from-pink-500 to-rose-500',
      Entertainment: 'from-indigo-500 to-purple-500',
      Healthcare: 'from-red-500 to-pink-500',
      Education: 'from-orange-500 to-red-500',
      Other: 'from-gray-500 to-slate-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Filters */}
      <div className="p-6 glass-dark rounded-2xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-400 transition-all duration-300 border border-gray-600 bg-dark-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-white transition-all duration-300 border border-gray-600 appearance-none bg-dark-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-white transition-all duration-300 border border-gray-600 bg-dark-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <AnimatePresence mode="wait">
        {filteredExpenses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="py-12 text-center glass-dark rounded-2xl"
          >
            <div className="mb-4 text-6xl">💸</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-300">No expenses found</h3>
            <p className="text-gray-400">Try adjusting your filters or add a new expense</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid gap-4"
          >
            {filteredExpenses.map((expense, index) => (
              <motion.div
                key={expense._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                layout
                className="p-6 transition-all duration-300 glass-dark rounded-2xl hover:shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(expense.category)} flex items-center justify-center text-white text-xl`}>
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white transition-colors group-hover:text-blue-300">
                        {expense.note}
                      </h3>
                      <div className="flex items-center mt-1 space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(expense.date)}</span>
                        </span>
                        <span className="px-2 py-1 text-xs rounded-lg bg-dark-400">
                          {expense.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <motion.span 
                      className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text"
                      whileHover={{ scale: 1.1 }}
                    >
                      {formatAmount(expense.amount)}
                    </motion.span>
                    
                    <div className="flex space-x-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEdit(expense)}
                        className="p-2 transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        <Edit2 className="w-4 h-4 text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDelete(expense._id)}
                        className="p-2 transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpenseList;