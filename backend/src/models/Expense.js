import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  note: {
    type: String,
    required: [true, 'Note is required'],
    trim: true,
    maxlength: [200, 'Note cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Food', 'Travel', 'Rent', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Other'],
      message: 'Category is not supported'
    },
    default: 'Other'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1 });
expenseSchema.index({ user: 1 });

export default mongoose.model('Expense', expenseSchema);