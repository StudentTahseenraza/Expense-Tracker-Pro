// frontend/src/pages/AddExpense.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenses } from '../hooks/useExpenses';

const AddExpense = () => {
  const { addExpense } = useExpenses();

  const handleSubmit = async (expenseData) => {
    const result = await addExpense(expenseData);
    if (result.success) {
      toast.success('🎉 Expense added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Redirect to home page instead of calling onSummaryUpdate
      window.location.hash = '/';
    } else {
      toast.error(`❌ ${result.error}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    return result;
  };

  return (
    <div className="container max-w-2xl px-4 py-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center mb-8 space-x-4">
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
              Add New Expense
            </h1>
            <p className="text-gray-400">Record your spending</p>
          </div>
        </div>

        {/* Expense Form */}
        <ExpenseForm onSubmit={handleSubmit} />
      </motion.div>
    </div>
  );
};

export default AddExpense;