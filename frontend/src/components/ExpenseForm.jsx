import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Loader2, Calendar, Tag, FileText, DollarSign } from 'lucide-react';
import ParticleEffect from './ParticleEffect';

const ExpenseForm = ({ expense, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
    category: 'Food'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount.toString(),
        date: new Date(expense.date).toISOString().split('T')[0],
        note: expense.note,
        category: expense.category
      });
    }
  }, [expense]);

  const categories = [
    { value: 'Food', label: '🍔 Food', color: 'text-green-400' },
    { value: 'Travel', label: '✈️ Travel', color: 'text-blue-400' },
    { value: 'Rent', label: '🏠 Rent', color: 'text-purple-400' },
    { value: 'Bills', label: '📱 Bills', color: 'text-yellow-400' },
    { value: 'Shopping', label: '🛍️ Shopping', color: 'text-pink-400' },
    { value: 'Entertainment', label: '🎬 Entertainment', color: 'text-indigo-400' },
    { value: 'Healthcare', label: '🏥 Healthcare', color: 'text-red-400' },
    { value: 'Education', label: '📚 Education', color: 'text-orange-400' },
    { value: 'Other', label: '📦 Other', color: 'text-gray-400' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.note.trim()) {
      newErrors.note = 'Note is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        amount: parseFloat(formData.amount),
        date: formData.date,
        note: formData.note.trim(),
        category: formData.category
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 shadow-2xl glass-dark rounded-2xl"
    >
      <h2 className="mb-6 text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
        {expense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Field */}
        <ParticleEffect>
          <div className="relative">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <label className="text-sm font-medium text-gray-300">Amount</label>
            </div>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              className="w-full px-4 py-3 mt-2 text-white placeholder-gray-400 transition-all duration-300 border border-gray-600 bg-dark-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
            <AnimatePresence>
              {errors.amount && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.amount}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </ParticleEffect>

        {/* Date Field */}
        <ParticleEffect>
          <div className="relative">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-400" />
              <label className="text-sm font-medium text-gray-300">Date</label>
            </div>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-4 py-3 mt-2 text-white transition-all duration-300 border border-gray-600 bg-dark-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <AnimatePresence>
              {errors.date && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.date}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </ParticleEffect>

        {/* Category Field */}
        <ParticleEffect>
          <div className="relative">
            <div className="flex items-center space-x-3">
              <Tag className="w-5 h-5 text-purple-400" />
              <label className="text-sm font-medium text-gray-300">Category</label>
            </div>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 mt-2 text-white transition-all duration-300 border border-gray-600 bg-dark-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value} className={cat.color}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </ParticleEffect>

        {/* Note Field */}
        <ParticleEffect>
          <div className="relative">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-yellow-400" />
              <label className="text-sm font-medium text-gray-300">Note</label>
            </div>
            <textarea
              value={formData.note}
              onChange={(e) => handleChange('note', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 mt-2 text-white placeholder-gray-400 transition-all duration-300 border border-gray-600 resize-none bg-dark-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="What was this expense for?"
            />
            <AnimatePresence>
              {errors.note && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.note}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </ParticleEffect>

        {/* Buttons */}
        <div className="flex pt-4 space-x-4">
          {onCancel && (
            <motion.button
              type="button"
              onClick={onCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-3 font-medium text-white transition-colors duration-300 bg-gray-600 rounded-xl hover:bg-gray-700"
            >
              Cancel
            </motion.button>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center flex-1 px-6 py-3 space-x-2 font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{expense ? 'Update' : 'Add'} Expense</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;