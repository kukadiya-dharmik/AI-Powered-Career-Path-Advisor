require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/zeni';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Server will continue without database connection');
  }
};

connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Import routes (to be added)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const careerRoutes = require('./routes/career');
app.use('/career', careerRoutes);

const learningHubRoutes = require('./routes/LearningHub');
app.use('/learninghub', learningHubRoutes);

const chatbotRoutes = require('./routes/chatbot');
app.use('/chatbot', chatbotRoutes);

// API 404 handler
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 