// frontend/src/pages/Reports.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import ExpenseSummary from '../components/ExpenseSummary';
import Charts from '../components/Charts';
import { expenseAPI } from '../api';

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setSummaryLoading(true);
      setError(null);
      console.log('Fetching summary data...');
      const response = await expenseAPI.getSummary();
      console.log('Summary response:', response.data);
      setSummary(response.data.data);
    } catch (err) {
      console.error('Error fetching summary:', err);
      const errorMsg = err.response?.data?.message || 'Failed to load reports';
      setError(errorMsg);
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleExport = () => {
    toast.info('Export feature coming soon!');
  };

  const handleShare = () => {
    toast.info('Share feature coming soon!');
  };

  const handleRefresh = () => {
    fetchSummary();
    toast.info('Refreshing reports...');
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <motion.a
              href="#/"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 transition-colors rounded-lg glass-dark hover:bg-dark-400"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.a>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Spending Reports
              </h1>
              <p className="text-gray-400">Analyze your expense patterns</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={summaryLoading}
              className="flex items-center px-4 py-2 space-x-2 transition-colors glass-dark rounded-xl hover:bg-dark-400 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${summaryLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center px-4 py-2 space-x-2 transition-colors glass-dark rounded-xl hover:bg-dark-400"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center px-4 py-2 space-x-2 transition-colors glass-dark rounded-xl hover:bg-dark-400"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </motion.button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 text-center border glass-dark rounded-2xl border-red-500/20"
          >
            <div className="mb-4 text-6xl">😞</div>
            <h3 className="mb-2 text-xl font-semibold text-red-400">Failed to Load Reports</h3>
            <p className="mb-4 text-gray-400">{error}</p>
            <motion.button
              onClick={fetchSummary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 font-semibold text-white transition-colors bg-blue-500 rounded-xl hover:bg-blue-600"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}

        {/* Loading State */}
        {summaryLoading && !error && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-6 glass-dark rounded-2xl animate-pulse">
                  <div className="w-1/2 h-4 mb-4 bg-gray-600 rounded"></div>
                  <div className="w-3/4 h-8 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
            <div className="p-8 text-center glass-dark rounded-2xl">
              <div className="flex justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
              </div>
              <p className="text-gray-400">Loading your reports...</p>
            </div>
          </div>
        )}

        {/* Summary Section */}
        {!summaryLoading && !error && summary && (
          <section>
            <ExpenseSummary summary={summary} loading={summaryLoading} />
          </section>
        )}

        {/* Charts Section */}
        {!summaryLoading && !error && summary && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Charts summary={summary} loading={summaryLoading} />
          </motion.section>
        )}

        {/* Empty State - No data */}
        {!summaryLoading && !error && summary && summary.total === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 text-center glass-dark rounded-2xl"
          >
            <div className="mb-4 text-6xl">📊</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-300">No Data Available</h3>
            <p className="mb-6 text-gray-400">Add some expenses to see beautiful charts and analytics</p>
            <motion.a
              href="#/add"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600"
            >
              <span>Add Your First Expense</span>
            </motion.a>
          </motion.div>
        )}

        {/* Insights Section - Only show when we have data */}
        {!summaryLoading && !error && summary && summary.total > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="p-6 glass-dark rounded-2xl">
              <h3 className="mb-4 text-lg font-semibold text-white">💡 Spending Insights</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p>• Your highest spending category is <span className="text-blue-400">
                  {summary.byCategory[0]?._id || 'N/A'}
                </span></p>
                <p>• You've made <span className="text-green-400">
                  {summary.byCategory.reduce((acc, cat) => acc + cat.count, 0)}
                </span> total transactions</p>
                <p>• Average transaction: <span className="text-purple-400">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                    summary.total / Math.max(summary.byCategory.reduce((acc, cat) => acc + cat.count, 0), 1)
                  )}
                </span></p>
              </div>
            </div>

            <div className="p-6 glass-dark rounded-2xl">
              <h3 className="mb-4 text-lg font-semibold text-white">🎯 Budget Tips</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <p>• Consider setting monthly budgets for each category</p>
                <p>• Review your recurring expenses regularly</p>
                <p>• Use the charts to identify spending trends</p>
              </div>
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
};

export default Reports;