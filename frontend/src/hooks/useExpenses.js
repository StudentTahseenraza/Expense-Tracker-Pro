// frontend/src/hooks/useExpenses.js
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { expenseAPI } from '../api.js';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await expenseAPI.getAll(filters);
      setExpenses(response.data.data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch expenses';
      setError(errorMsg);
      if (err.response?.status !== 401) { // Don't show toast for auth errors
        toast.error(`❌ ${errorMsg}`);
      }
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await expenseAPI.create(expenseData);
      setExpenses(prev => [response.data.data, ...prev]);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add expense';
      return { success: false, error: errorMsg };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const response = await expenseAPI.update(id, expenseData);
      setExpenses(prev => prev.map(exp => 
        exp._id === id ? response.data.data : exp
      ));
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update expense';
      return { success: false, error: errorMsg };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expenseAPI.delete(id);
      setExpenses(prev => prev.filter(exp => exp._id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete expense';
      return { success: false, error: errorMsg };
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses
  };
};