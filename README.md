Expense Tracker Pro 💰
A modern, full-stack personal expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features beautiful analytics, secure authentication, and a stunning glass-morphism UI with smooth animations.
--------------------------------------------------------------------------------------------------
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d1df3e4c-4dd7-4912-a990-8e4c790718e8" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c48d2f07-b188-4340-ae50-32c88210b355" />



🚀 Features
✨ Core Functionality
Add Expenses - Record transactions with amount, date, category, and notes

View Expenses - Beautiful list view with filtering and search

Update Expenses - Edit any expense field with real-time updates

Delete Expenses - Secure removal with confirmation dialogs

Data Persistence - MongoDB cloud database with automatic backups
--------------------------------------------------------------------------------------------------

📊 Advanced Analytics
Smart Summary - Total spending, category breakdown, monthly trends

Interactive Charts - Pie charts for categories, bar charts for monthly spending

Spending Insights - AI-powered budget tips and spending patterns

Real-time Reports - Dynamic reports that update instantly
--------------------------------------------------------------------------------------------------

🎨 Premium UI/UX
Glass Morphism Design - Stunning frosted glass effects throughout

Smooth Animations - Framer Motion powered transitions and micro-interactions

Dark Theme - Eye-friendly dark mode with gradient accents

Responsive Design - Perfect experience on all devices

3D Particle Effects - Interactive background with floating particles
--------------------------------------------------------------------------------------------------

🔐 Security & Performance
JWT Authentication - Secure login/register with encrypted passwords

User Isolation - Complete data separation between users

Input Validation - Comprehensive client and server-side validation

Error Handling - Graceful error states with user-friendly messages

Loading Optimizations - Skeleton screens and progressive loading
--------------------------------------------------------------------------------------------------

🛠 Tech Stack
Frontend
React 18 - Modern React with hooks and functional components

Vite - Lightning fast build tool and dev server

Tailwind CSS - Utility-first CSS framework with custom configurations

Framer Motion - Production-ready motion library for animations

Recharts - Composable charting library built on React

React Toastify - Beautiful notification system

Lucide React - Beautiful & consistent icon toolkit

Axios - Promise-based HTTP client

Backend
Node.js - JavaScript runtime environment

Express.js - Fast, unopinionated web framework

MongoDB - NoSQL database for flexible data storage

Mongoose - Elegant MongoDB object modeling

JWT - JSON Web Tokens for secure authentication

bcryptjs - Password hashing library

CORS - Cross-Origin Resource Sharing enabled

Helmet - Security middleware for Express
--------------------------------------------------------------------------------------------------

🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

MongoDB (local or Atlas cloud)

npm or yarn

Installation
Clone the repository

--------------------------------------------------------------------------------------------------
git clone https://github.com/your-username/expense-tracker-pro.git
cd expense-tracker-pro
Backend Setup

bash
cd backend
npm install

# Create environment file
cp .env.example .env
Configure your .env file:
--------------------------------------------------------------------------------------------------

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
NODE_ENV=development
Frontend Setup
--------------------------------------------------------------------------------------------------

cd ../frontend
npm install
Start Development Servers


# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
Access the Application

Frontend: http://localhost:3000

Backend API: http://localhost:5000
--------------------------------------------------------------------------------------------------

📱 Usage Guide
Getting Started
Create an Account - Register with your name, email, and password

Add Your First Expense - Click "Add Expense" and fill in the details

Explore Dashboard - View your spending summary and recent transactions

Analyze Reports - Check the Reports page for detailed analytics

Managing Expenses
Quick Add: Use the floating action button for quick expense entry

Bulk Actions: Select multiple expenses for batch operations

Smart Filtering: Filter by date range, category, or search terms

Export Data: Download your expense data as CSV or PDF

Understanding Analytics
Category Breakdown: See where your money goes with pie charts

Monthly Trends: Track spending patterns over time

Budget Insights: Get AI-powered suggestions for saving money

Spending Alerts: Set custom alerts for budget limits
--------------------------------------------------------------------------------------------------

🔌 API Documentation
Authentication Endpoints
text
POST /api/auth/register    # Create new user account
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user data
Expense Endpoints
text
GET    /api/expenses       # Get all expenses (with filters)
POST   /api/expenses       # Create new expense
PUT    /api/expenses/:id   # Update existing expense
DELETE /api/expenses/:id   # Delete expense
GET    /api/expenses/summary # Get analytics summary
Query Parameters
category - Filter by expense category

startDate / endDate - Date range filtering

search - Text search in expense notes

limit / skip - Pagination controls
--------------------------------------------------------------------------------------------------

🎨 Customization
Theming
Modify the color scheme in tailwind.config.js:

javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
Adding New Categories
Update the category enum in both frontend and backend:

javascript
// Backend - Expense model
enum: ['Food', 'Travel', 'Rent', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Other']
Custom Charts
Extend the Charts component to add new visualizations:

javascript
// Add new chart types in Charts.jsx
<LineChart data={monthlyTrends} />
<AreaChart data={spendingPatterns} />
🔒 Security Features
Password Hashing: bcryptjs with salt rounds

JWT Tokens: Secure authentication with expiration

CORS Protection: Configured for specific origins

Input Sanitization: Prevents NoSQL injection and XSS attacks

Rate Limiting: API request limiting (ready to implement)

Helmet.js: Security headers protection
--------------------------------------------------------------------------------------------------

📈 Performance Optimizations
React.memo: Component memoization to prevent re-renders

useCallback/useMemo: Optimized hook dependencies

Lazy Loading: Code splitting for faster initial load

Image Optimization: Compressed assets and lazy loading

Database Indexing: Optimized MongoDB queries

Caching: Client-side caching for frequently accessed data
--------------------------------------------------------------------------------------------------

🐛 Troubleshooting
Common Issues
MongoDB Connection Failed

Ensure MongoDB is running locally

Check connection string in .env file

Verify network connectivity for Atlas

JWT Authentication Errors

Verify JWT_SECRET is set in environment

Check token expiration settings

Clear browser cookies and localStorage

CORS Errors

Confirm backend CORS configuration

Check frontend API base URL

Verify port configurations

Build Errors

Clear node_modules and reinstall dependencies

Check Node.js version compatibility

Verify all environment variables are set
--------------------------------------------------------------------------------------------------

Debug Mode
Enable detailed logging by setting:

env
NODE_ENV=development
DEBUG=true
🤝 Contributing
We welcome contributions! Please see our Contributing Guide for details.

Development Workflow
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Code Standards
Use Prettier for code formatting

Follow ESLint rules

Write meaningful commit messages

Add tests for new features

Update documentation accordingly
--------------------------------------------------------------------------------------------------

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
React Team - For the amazing framework

Tailwind CSS - For the utility-first CSS approach

Framer Motion - For smooth animations

MongoDB - For the flexible database solution

Vercel - For excellent deployment platform
--------------------------------------------------------------------------------------------------

📞 Support
Documentation: Read the Docs

Issues: GitHub Issues

Email: support@expense-tracker-pro.com

Discord: Join our community Discord Server
--------------------------------------------------------------------------------------------------
🚀 Deployment

Vercel (Frontend)

npm run build
vercel --prod
render (Backend)
git push render main
Environment Variables for Production
env

NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=https://your-frontend-domain.com

<div align="center">
Built with ❤️ using the MERN Stack

</div>

