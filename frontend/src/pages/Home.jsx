// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, PieChart, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseForm from '../components/ExpenseForm';
import { expenseAPI } from '../api';

const Home = () => {
  const { expenses, loading, error, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(null);

  // Fetch summary data for the home page
  const fetchSummary = async () => {
    try {
      setSummaryLoading(true);
      setSummaryError(null);
      const response = await expenseAPI.getSummary();
      setSummary(response.data.data);
    } catch (err) {
      console.error('Error fetching summary:', err);
      const errorMsg = err.response?.data?.message || 'Failed to load summary';
      setSummaryError(errorMsg);
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleAddExpense = async (expenseData) => {
    const result = await addExpense(expenseData);
    if (result.success) {
      setShowForm(false);
      // Refresh summary after adding expense
      fetchSummary();
      toast.success('🎉 Expense added successfully!');
    } else {
      toast.error(`❌ ${result.error}`);
    }
    return result;
  };

  const handleEditExpense = async (expenseData) => {
    const result = await updateExpense(editingExpense._id, expenseData);
    if (result.success) {
      setEditingExpense(null);
      // Refresh summary after updating expense
      fetchSummary();
      toast.success('✅ Expense updated successfully!');
    } else {
      toast.error(`❌ ${result.error}`);
    }
    return result;
  };

  const handleDeleteExpense = async (id) => {
    // Create a custom confirmation toast
    toast.info(
      <div className="space-y-2">
        <p className="font-semibold">Are you sure you want to delete this expense?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              toast.dismiss();
              performDeleteExpense(id);
            }}
            className="px-3 py-1 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 text-white transition-colors bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const performDeleteExpense = async (id) => {
    const result = await deleteExpense(id);
    if (result.success) {
      // Refresh summary after deleting expense
      fetchSummary();
      toast.success('🗑️ Expense deleted successfully!');
    } else {
      toast.error(`❌ ${result.error}`);
    }
  };

  const handleRefreshSummary = () => {
    fetchSummary();
    toast.info('Refreshing summary...');
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
          Expense Tracker Pro
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-300">
          Take control of your finances with beautiful analytics and smart insights
        </p>
      </motion.header>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 xl:col-span-2">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="p-6 text-left transition-all duration-300 border border-gray-700 glass-dark rounded-2xl group hover:shadow-xl hover:border-blue-500/50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Add Expense</h3>
                  <p className="text-sm text-gray-400">Record a new transaction</p>
                </div>
              </div>
            </motion.button>

            <motion.a
              href="#/reports"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 text-left transition-all duration-300 border border-gray-700 cursor-pointer glass-dark rounded-2xl group hover:shadow-xl hover:border-blue-500/50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">View Reports</h3>
                  <p className="text-sm text-gray-400">See spending analytics</p>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Recent Expenses */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 border border-gray-700 glass-dark rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center space-x-2 text-2xl font-bold">
                <PieChart className="w-6 h-6 text-blue-400" />
                <span>Recent Expenses</span>
              </h2>
              <span className="px-3 py-1 text-gray-400 rounded-lg bg-dark-400">
                {expenses.length} transactions
              </span>
            </div>
            
            <ExpenseList
              expenses={expenses}
              onEdit={setEditingExpense}
              onDelete={handleDeleteExpense}
              loading={loading}
            />
          </motion.section>
        </div>

        {/* Sidebar - Summary Section */}
        <div className="space-y-8">
          {/* Summary Header with Refresh Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Summary</h2>
            <motion.button
              onClick={handleRefreshSummary}
              disabled={summaryLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 transition-colors rounded-lg glass-dark hover:bg-dark-400 disabled:opacity-50"
              title="Refresh Summary"
            >
              <RefreshCw className={`w-4 h-4 ${summaryLoading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>

          {/* Summary Section */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ExpenseSummary 
              summary={summary} 
              loading={summaryLoading} 
              error={summaryError}
            />
          </motion.section>
        </div>
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md"
          >
            <ExpenseForm
              onSubmit={handleAddExpense}
              onCancel={() => setShowForm(false)}
            />
          </motion.div>
        </div>
      )}

      {/* Edit Expense Modal */}
      {editingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md"
          >
            <ExpenseForm
              expense={editingExpense}
              onSubmit={handleEditExpense}
              onCancel={() => setEditingExpense(null)}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;