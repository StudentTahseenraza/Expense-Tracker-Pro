// frontend/src/components/Charts.jsx
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const Charts = ({ summary, loading = false }) => {
  // Safe data access with defaults
  const byCategory = summary?.byCategory || [];
  const byMonth = summary?.byMonth || [];

  // Prepare category data for pie chart
  const categoryData = byCategory.map(item => ({
    name: item._id,
    value: item.total,
    count: item.count
  }));

  // Prepare monthly data for bar chart
  const monthlyData = byMonth.map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    amount: item.total,
    count: item.count
  })).reverse();

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];

  const formatAmount = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 border border-gray-600 rounded-lg glass-dark">
          <p className="font-semibold text-white">{label}</p>
          <p className="text-blue-400">
            Amount: {formatAmount(payload[0].value)}
          </p>
          {payload[0].payload.count && (
            <p className="text-gray-400">
              Transactions: {payload[0].payload.count}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[1, 2].map(i => (
          <div key={i} className="p-6 glass-dark rounded-2xl">
            <div className="animate-pulse">
              <div className="w-1/3 h-6 mx-auto mb-6 bg-gray-600 rounded"></div>
              <div className="h-64 bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (categoryData.length === 0 && monthlyData.length === 0) {
    return (
      <div className="p-12 text-center glass-dark rounded-2xl">
        <div className="mb-4 text-6xl">📊</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-300">No Data Available</h3>
        <p className="text-gray-400">Add some expenses to see beautiful charts and analytics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Pie Chart - Category Distribution */}
      {categoryData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 glass-dark rounded-2xl"
        >
          <h3 className="mb-6 text-lg font-semibold text-center text-white">
            Expenses by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Bar Chart - Monthly Spending */}
      {monthlyData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 glass-dark rounded-2xl"
        >
          <h3 className="mb-6 text-lg font-semibold text-center text-white">
            Monthly Spending
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={value => formatAmount(value).replace('₹', '₹')}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="amount" 
                name="Amount Spent"
                radius={[4, 4, 0, 0]}
              >
                {monthlyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Fallback if only one chart has data */}
      {(categoryData.length === 0 || monthlyData.length === 0) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-12 text-center glass-dark rounded-2xl lg:col-span-2"
        >
          <div className="mb-4 text-4xl">📈</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-300">
            {categoryData.length === 0 ? 'No Category Data' : 'No Monthly Data'}
          </h3>
          <p className="text-gray-400">
            {categoryData.length === 0 
              ? 'Add expenses with different categories to see the distribution' 
              : 'Expenses from multiple months will show trending data'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Charts;